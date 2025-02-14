# @haykaghabekyan/i18n

## **Installation**

1. First, install the package:

```
   npm install @haykaghabekyan/i18n
```

2.	Next, configure the environment variables for your app:

```
I18N_LOCALES=en,fr
I18N_DEFAULT_LOCALE=en
I18N_DEFAULT_NAMESPACE=common
```

3.	Create the required locale files under public/locales:

```
public/locales/
├── en/
│   ├── common.json
│   └── footer.json
├── fr/
│   ├── common.json
│   └── footer.json
```

Example of a locale file (common.json):

```
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```

## **Client-side usage**

1.	Import the useI18n hook:
Inside your React client components, import the useI18n hook to access translation functions and the current locale.

```
import { useI18n } from '@haykaghabekyan/i18n';
```

2.	Use the hook inside your component:
Once you have the hook imported, you can access the locale, the t function (for translations), and getLocalizedPath (to get localized URLs).

import { useI18n } from '@haykaghabekyan/i18n';

```
const MyComponent = () => {
  const { t, locale, getLocalizedPath } = useI18n();

    return (
        <div>
            <p>{t('hello')}</p>  {/* Output: "Hello" based on current locale */}
            <p>{t('goodbye')}</p>  {/* Output: "Goodbye" based on current locale */}

            <p>Current Locale: {locale}</p>  {/* Current locale (en, fr, etc.) */}

            <a href={getLocalizedPath('/about')}>
            Go to About (localized path)
            </a>  {/* /en/about or /fr/about based on current locale */}
        </div>
    );
};
```

How it works:
1. locale: Represents the current locale, e.g., "en" or "fr". You can use this to display locale-specific information or manage locale-switching in your app.
2. t function: Translates a key based on the current locale. If the key is not found in the loaded translations, it returns the key itself. The t function can accept placeholders for dynamic values:
```bash
t('greeting', { name: 'John' });  // "Hello, John!"
```
3. getLocalizedPath(path: string): Returns the localized path by prefixing the provided path with the current locale. For example, calling getLocalizedPath('/about') when the locale is "en" will return "/en/about".

## **Handling Different Languages**

You can easily extend the supported languages by adding more locale files under public/locales/{language}/. Each language should contain .json files for each namespace, e.g., common.json, footer.json, etc.

For example, for French (fr), you’d create the following structure:
```
public/locales/
└── fr/
    ├── common.json
    └── footer.json
```

Example footer.json for French:
```
{
  "footerText": "Bienvenue dans notre site"
}
```

Usage in Component:

```
<p>{t('footerText')}</p>  {/* In French locale, output will be: "Bienvenue dans notre site" */}
```

## **Usage of the Trans component**
Use the Trans component inside your React components to dynamically inject elements into the translated string.

```
import { Trans } from '@haykaghabekyan/i18n';

const MyComponent = () => {
  const userName = "John";

  return (
    <div>
      <Trans
        i18nKey="helloUser"
        components={{
          user: <strong>{userName}</strong>
        }}
      />
      {/* Example of key "helloUser" being translated like: "Hello, <user />" */}
    </div>
  );
};
```

Locale File Example (common.json):

```
{
  "helloUser": "Hello, <user />!"
}
```

This will replace <user /> with the <strong>{userName}</strong> component in the translated string.
