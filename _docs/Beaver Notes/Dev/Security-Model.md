---
layout: post
title: Security Model
details: Encryption, key management, and threat model
category: Beaver Notes (DEV)
position: 8
---

## Overview

Beaver Notes has two independent encryption layers:

1. **App-level encryption**: Automatic AES-256-GCM encryption of all note content and assets at rest
2. **Per-note password lock**: Manual password protection for individual notes

Both are implemented in Rust (src-tauri) with the frontend delegating via Tauri IPC. Heavy crypto operations run in a Web Worker pool (up to 4 workers) to avoid blocking the UI thread.

## App-Level Encryption

### Key Hierarchy

<!-- IMAGE_SUGGESTION: Visual diagram of the key hierarchy: User Passphrase → Argon2id/PBKDF2 → KEK → wraps 256-bit Data Key → AES-256-GCM encrypts note content. Include the manifest file on disk -->

```
User passphrase
    → Argon2id (or PBKDF2) → KEK (Key Encryption Key)
        → wraps random 256-bit Data Key
            → AES-256-GCM encrypts note content
```

### Manifest File

Stored at `{app_data_dir}/app-crypto/manifest.v3.json`:

```json
{
  "version": 3,
  "scope": "app",
  "argon2_salt_hex": "...",
  "argon2_memory_kib": 16384,
  "argon2_iterations": 2,
  "argon2_parallelism": 2,
  "password_check": {
    "nonce": "...",
    "cipher": "..."
  },
  "wrapped_key": {
    "nonce": "...",
    "cipher": "..."
  }
}
```

### Key Derivation

| Algorithm | Parameters | Used for |
|---|---|---|
| **Argon2id** (v3 manifests) | 16 MiB memory, 2 iterations, 2 parallelism | New encryption setups |
| **PBKDF2-HMAC-SHA256** (legacy) | 100,000 iterations | Pre-v3 manifests |

The derived KEK encrypts a randomly generated 256-bit data key. The data key is stored in the manifest wrapped with AES-256-GCM.

### Note Encryption

Each note's content JSON is serialized, encrypted with AES-256-GCM using the data key, and stored as:

```json
{
  "ae": 2,
  "nonce": "<96-bit base64>",
  "cipher": "<ciphertext base64>"
}
```

### Asset Encryption

Assets (images, files) are encrypted with streaming AES-256-GCM:

- **Format**: `BNA3` magic header (4 bytes) + nonce seed + variable-length encrypted chunks
- **Chunk size**: 256 KiB
- **Per-chunk nonce**: Derived from HMAC with the seed
- **On disk**: Encrypted assets get a `.enc` extension

### Password Verification

The manifest includes a `password_check` field containing a well-known string (`"BeaverNotes-app-manifest-v3"`) encrypted with the data key. On unlock, the app decrypts this field: if it matches, the passphrase is correct.

## Per-Note Password Lock

Separate from app-level encryption:

<!-- IMAGE_SUGGESTION: Diagram showing the two-layer encryption model: App-level encryption (automatic, all notes) and Per-note password lock (manual, individual notes), with the password hash stored in the OS keychain -->

- Each locked note's content is encrypted with a key derived from a per-user password
- The password hash (bcrypt) is stored in the OS keychain via the `keyring` crate
- The `passwordStore` (`src/store/passwd.js`) manages bcrypt verification and session caching
- The shared key is kept in memory for the session and cleared on app close

## Platform Safe Storage

The `secure_blob.rs` module provides an encrypted blob cache:

1. **Primary**: OS keychain via the `keyring` crate (macOS Keychain, Linux Secret Service, Windows Credential Manager)
2. **Fallback**: File-based key at `~/.local/share/com.beaver-notes.beaver-notes/master.key` (encrypted with a device-specific key)

## Sync Encryption

When app-level encryption is enabled, sync data is also encrypted:

- Sync manifests use scope `"sync"` with check string `"BeaverNotes-sync-manifest-v3"`
- Commit payloads are encrypted via `encryption_encrypt_sync_payload` / `encryption_decrypt_sync_payload`
- Sync encryption keys are stored in the sync directory under `crypto/`

## Threat Model

<!-- IMAGE_SUGGESTION: Security threat model diagram showing the various attack vectors (physical access, cloud storage compromise, malware, OS keychain compromise, brute force) and their corresponding mitigations as arrows/flow -->

| Threat | Mitigation |
|---|---|
| Physical device access | App-level encryption at rest. Without passphrase, note content is inaccessible |
| Cloud storage provider access to sync folder | Sync commits are encrypted with the app key |
| Keylogger/malware | Passphrase is in memory only during unlock. Data key is cached in Rust memory |
| OS keychain compromise | Master key is encrypted with device-specific key as fallback |
| Brute force passphrase | Argon2id (memory-hard, 16 MiB) makes GPU/ASIC attacks expensive |

## Key Files

| File | Purpose |
|---|---|
| `src-tauri/src/shared/crypto.rs` | Core crypto: AES-256-GCM, Argon2id, PBKDF2, key derivation, asset streaming encryption |
| `src-tauri/src/secure_blob.rs` | OS keychain integration with encrypted file fallback |
| `src/utils/crypto/codec.js` | Frontend crypto: Web Worker pool, PBKDF2, AES-GCM operations |
| `src/utils/crypto/worker.js` | Web Worker script for off-thread crypto |
| `src/utils/crypto/encryption.js` | App-level encryption lifecycle (enable, disable, migrate) |
| `src/utils/crypto/noteCrypto.js` | Legacy per-note encryption |
| `src/store/passwd.js` | Password hashing, verification, session management |
| `src/store/note/lock.js` | Per-note locking/unlocking |
| `src/store/note/encryption.js` | Bulk encrypt/decrypt notes during migration |
