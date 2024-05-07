import type { AppProps } from "next/app";
import { Menubar } from "@/components/Menubar";
import { UserBalanceProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { WebApp } from "@grammyjs/web-app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="relative h-screen bg-cover overflow-x-hidden" style={{ background: `url('/img/stars.png')` }}>
      <div className="h-full">
        <UserBalanceProvider>
          <Component {...pageProps} />
        </UserBalanceProvider>
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
