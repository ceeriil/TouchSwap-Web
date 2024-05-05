# Touch Swap Web App

This is the Telegram Web Apps for touch swap   using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

### Why Next.js?

Next.js is easy and powerful, it also allows creating API routes without the need for another server and any troubles, For example, it's ideal for validating the incoming web app's request hash.


Now, clone the [`.env.example`](.env.example) file and rename it to `.env.local` and fill the variables with your data.

- `BOT_TOKEN`: Your Telegram Bot Token (used for validating the incoming requests, see [Request Validation](#request-validation) for more info)

```bash
pnpm dev
```

### Testing locally w/ [ngrok](https://ngrok.com/)

Since Telegram only accepts HTTPS links, you'll need to use a tunneling service like [ngrok](https://ngrok.com/) to test your bot locally.

```bash
# Copy the HTTPS URL given by ngrok and use it as main URL for your bot.
# If the port differs from 3000, change it accordingly.
ngrok http 3000
```

### Bundle Analyzer

This template is already configured to use [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer), which is a plugin for Next.js that analyzes the bundle size of your application (useful when you want to replace a library with another smaller one). The following command will generate a report in the `.next/analyze` folder and open it in your browser.

```bash
pnpm analyze
```

## Request Hash Validation

All the requests are validated using an API route that checks if the request is coming from Telegram. [Telegram's documentation](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) explains how it works.

### Disabling the validation

To disable this feature, delete the [`pages/api/validate-hash.ts`](pages/api/validate-hash.ts) file and remove the `useEffect` hook from [`pages/_app.tsx`](pages/_app.tsx) and it's dependencies.

```diff
# src/pages/_app.tsx
import type { AppProps } from 'next/app';
- import { useEffect, useState } from 'react';
- import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
-  const [isHashValid, setIsHashValid] = useState(false);

-  // Wait for validation to complete before rendering the page and stop the
-  // rendering if the hash is invalid. Comment out the following useEffect
-  // hook to see the page render without the hash validation.
-  useEffect(() => {
-    axios
-      .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
-      .then(response => setIsHashValid(response.status === 200));
-  }, []);

-  if (!isHashValid) {
-    return null;
-  }

  return <Component {...pageProps} />;
}
```

### Using [`initData`](https://core.telegram.org/bots/webapps#webappinitdata)

You can use it in the `window.Telegram.WebApp.initDataUnsafe` but it's not recommended by Telegram. There's the hook [`useTelegramInitData`](src/hooks/useTelegramInitData.ts) that parses the data and returns an object.

```tsx
// src/pages/init-data.tsx
import { useTelegramInitData } from '../hooks/useTelegramInitData';

export default function InitData() {
  const initData = useTelegramInitData();

  return (
    <div>
      <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
    </div>
  );
}
```
