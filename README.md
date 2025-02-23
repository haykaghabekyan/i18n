# @haykaghabekyan/i18n

## **Installation**

1. First, install the package:

```bash
  npm install @haykaghabekyan/i18n
```

2.	Next, configure the environment variables for your app:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_I18N_LOCALES=en,fr
NEXT_PUBLIC_I18N_DEFAULT_LOCALE=en
NEXT_PUBLIC_I18N_DEFAULT_NAMESPACE=common
```

## 🌍 Internationalization (i18n) Configuration  

This project loads translations dynamically using the **Fetch API**, making it compatible with both the **Edge Runtime** and **Server Components**.  

### 🔧 Environment Variables  

The following **environment variables** must be set in your `.env` file:  

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | ✅ Yes | The base URL for fetching translations. This is **mandatory** because translations are now loaded via the Fetch API instead of reading from files. |
| `NEXT_PUBLIC_I18N_LOCALES` | ❌ No | A comma-separated list of supported locales (e.g., `en,fr,de`). If not provided, the default language will be **English (`en`)**. |
| `NEXT_PUBLIC_I18N_DEFAULT_NAMESPACE` | ❌ No | The default translation namespace. If not set, it will default to **`common`**. |

These environment variables start with NEXT_PUBLIC_ because they are needed both on the server and the client side.
* If NEXT_PUBLIC_I18N_LOCALES is not provided, the default supported language will be English (en).
* If NEXT_PUBLIC_I18N_DEFAULT_NAMESPACE is not provided, the default namespace will be common.

3.	Create the required locale files under public/locales:

```bash
public/locales/
├── en/
│   ├── common.json
│   └── footer.json
├── fr/
│   ├── common.json
│   └── footer.json
```

Example of a locale file (common.json):

```json
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```

## **Usage**

### **Server-side usage**

1. You need to import I18nProviderServer from the package.

```ts
import { I18nProviderServer } from '@haykaghabekyan/i18n';
```

2. Wrap your app in I18nProviderServer and provide locale and namespaces as props:
This ensures that translations are fetched and provided to your server-rendered pages.

```ts
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProviderServer locale="en" namespaces={['common']}>
      {children}
    </I18nProviderServer>
  );
}
```

###  **Client-side usage**

1.	Import the useI18n hook:
Inside your React client components, import the useI18n hook to access translation functions and the current locale.

```ts
import { useI18n } from '@haykaghabekyan/i18n';
```

2.	Use the hook inside your component:
Once you have the hook imported, you can access the locale, the t function (for translations), and getLocalizedPath (to get localized URLs).

```ts
const MyComponent = () => {
  const { t, locale, getLocalizedPath } = useI18n();

    return (
        <div>
            <p>{t('common:hello')}</p>  {/* Output: "Hello" based on current locale */}
            <p>{t('common:goodbye')}</p>  {/* Output: "Goodbye" based on current locale */}

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

```ts
t('common:greeting', { name: 'John' });  // "Hello, John!"
```

3. getLocalizedPath(path: string): Returns the localized path by prefixing the provided path with the current locale. For example, calling getLocalizedPath('/about') when the locale is "en" will return "/en/about".

### **Using getI18n for Server-side Translations**

getI18n is the server-side equivalent of useI18n. It allows you to fetch translations and use them in server-side components or functions.

1. Import the getI18n function:

```ts
import { getI18n } from '@haykaghabekyan/i18n';
```

2. Use getI18n in server-side components or functions. It returns an object similar to useI18n, including locale, t, and getLocalizedPath.

```ts
export async function MyServerFunction() {
  const { t } = await getI18n('fr', ['common']);

  console.log(t('common:hello'));  // Output: "Bonjour" (if translation exists)
}
```

## **Handling Different Languages**

You can easily extend the supported languages by adding more locale files under public/locales/{language}/. Each language should contain .json files for each namespace, e.g., common.json, footer.json, etc.

For example, for French (fr), you’d create the following structure:

```bash
public/locales/
└── fr/
    ├── common.json
    └── footer.json
```

Example footer.json for French:
```json
{
  "footerText": "Bienvenue dans notre site"
}
```

Usage in Component:

```ts
<p>{t('footer:footerText')}</p>  {/* In French locale, output will be: "Bienvenue dans notre site" */}
```

## **Usage of the Trans component**
1.	You need to import Trans component from the package.

```ts
import { Trans } from '@haykaghabekyan/i18n';
```

2.	Use the Trans component inside your React components to dynamically inject elements into the translated string.

```ts
const MyComponent = () => {
  const userName = "John";

  return (
    <div>
      <Trans
        i18nKey="common:helloUser"
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

```json
{
  "helloUser": "Hello, <user />!"
}
```

This will replace <user /> with the <strong>{userName}</strong> component in the translated string.
