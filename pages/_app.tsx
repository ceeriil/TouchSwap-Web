import { type FC, useEffect, useMemo, Suspense } from "react";
import type { AppProps } from "next/app";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loader } from "@/components/Loader";
import "@/styles/globals.css";
import {
  SDKProvider,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  isSSR,
  retrieveLaunchParams,
  useBackButton,
  useMiniApp,
  useThemeParams,
  useViewport,
  initMiniApp,
} from "@tma.js/sdk-react";
import axios from "axios";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const { back } = useNavigationRouter();
  const bb = useBackButton(true);

  useEffect(() => {
    if (!bb) {
      return;
    }
    if (router.pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
  }, [router, bb]);

  useEffect(() => {
    return bb && bb.on("click", back);
  }, [bb, back]);

  return null;
};

const App: FC<AppProps> = ({ pageProps, Component }) => {
  const miniApp = useMiniApp(true);
  const themeParams = useThemeParams(true);
  const viewport = useViewport(true);

  useEffect(() => {
    return miniApp && themeParams && bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return themeParams && bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <BackButtonManipulator />
        <>
          <main
            className="relative bgcover overflowxhidden"
            style={{ background: `url('/img/stars.svg')` }}
          >
            <Component {...pageProps} />
          </main>
          <Toaster />
        </>
      </Suspense>
    </>
  );
};

const Inner: FC<AppProps> = (props) => {
  const debug = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    if (debug) {
      let el = document.createElement("div");
      document.body.appendChild(el);
      import("eruda").then((lib) =>
        lib.default.init({
          container: el,
          tool: ["console", "elements"],
        })
      );
    }
  }, [debug]);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <App {...props} />
    </SDKProvider>
  );
};

export default function CustomApp(props: AppProps) {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner {...props} />
    </ErrorBoundary>
  );
}
