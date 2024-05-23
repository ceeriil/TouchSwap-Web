import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TelegramWebApps } from 'telegram-webapps-types';
import useTelegramInitData from "@/hooks/useTelegramInitData";


export default function App({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);
  const initData = useTelegramInitData();
  useEffect(() => {
    if(initData.user !== null){
      axios
        .post('/api/validateHash', { hash: window.Telegram.WebApp.initData })
        .then(response => setIsHashValid(response.status === 200))
        .catch(()=>setIsHashValid(false) );
      }
  }, []);

  if (!isHashValid) {
    return null;
  }
  return (
    <>
      <Toaster />
      <main className="relative bgcover overflowxhidden" style={{ background: `url('/img/stars.svg')` }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
