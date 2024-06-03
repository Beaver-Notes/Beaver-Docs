---
sidebar_position: 3
---

Now that you have your development environment ready, let's move on to building and testing Beaver Notes.

## Test the App
Before testing the app, you should install all the dependencies by running the following command:

```sh
yarn add
```

To initiate watch mode and continuously observe your app while developing, run:

```sh
yarn watch
```

## Build the App

:::danger
Please note that building for macOS requires a Mac, and building for flatpak and snap requires Linux with a specific setups.
Keep in mind that building for different platforms may require additional dependencies or configurations. Please refer to the documentation and requirements of each platform for smooth building and packaging.
:::

:::warning
Keep in mind that **when buildoing for Windows** Electron builder will erase the .exe package if you compile for both ARM and x64 at the same time, as both packages will have the same name. Therefore, you should build the ARM version first and add '.arm64' before the '.exe' prefix so that the package isn't deleted when you build the x64 version.
:::

To build Beaver Notes, run the following command

> Remember to specify platform: **windows, mac, linux** and architecture: **arm64, x64**

```sh
yarn build && yarn electron-builder build --config electron-builder.config.cjs --platfrom --architecture
```


