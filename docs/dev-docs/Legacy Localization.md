---
sidebar_position: 6
---
At Beaver, we believe in creating software that is both privacy-friendly and accessible to everyone, and you can assist us in achieving this by translating Beaver into your own language.

:::info

Languages can be added to Beaver Notes regardless of territorial or cultural issues. Our aim is to make note-taking universally accessible, allowing users to choose their preferred language. There's no place for hate and discrimination in this community, so please be respectful and cooperative. Together, we can build an inclusive note-taking experience, benefiting all.
:::

# Getting Started

Open the `'/packages/renderer/src/utils/commands.js'` file, locate the import section in the file and add the following lines:

```javascript
import enTranslations from "../pages/settings/locales/en.json";

if (selectedLanguage === "en") {
  translations = enTranslations;
}
```

:::warning
Replace the 'en' abbreviation with your own language's abbreviation in both 'enTranslations' and 'en.json.
:::

After that head to `'/packages/renderer/src/pages/settings/Index.vue'` and add the following to the import section

```javascript
import enTranslations from "./locales/en.json";
```

Open the `'/packages/renderer/src/pages/settings/Index.vue'` file, locate the data() method, and find the 'languages' section inside it. It should be structured like this:

```javascript
 data() {
    return {
      selectedFont: localStorage.getItem('selected-font') || 'Arimo',
      selectedLanguage: localStorage.getItem('selectedLanguage') || 'en', // Initialize with a value from localStorage if available
      languages: [
        { code: 'en', name: 'English', translations: enTranslations },
      ],
    };
  },
```

Under the 'languages' section, add the following line:

```javascript
{ code: 'en', name: 'English', translations: enTranslations },

```
You're halfway done! Now, you'll need to navigate to 'packages/renderer/src/lib/tiptap/index.js' and add the following lines:

Under the imports, add:

```javascript
import enTranslations from '../../pages/settings/locales/en.json';
```

Under // Import and assign other languages as needed, add:

```javascript
else if (selectedLanguage === 'en') {
  translations = enTranslations;
}
```

One last step to go! Now, head to 'packages/renderer/src/components/home/HomeNoteCard.vue' and under the import, add:

```javascript
import 'dayjs/locale/en';
```

Kudos! You've successfully added support for a new language, making Beaver Notes more accessible to a ton of people. You can now check if everything appears to be correct, and if it is, then feel free to open a pull request on GitHub. It will be promptly reviewed, and unless further verification is needed, it will be added to a new release of the app.