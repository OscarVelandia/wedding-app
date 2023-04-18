import "@globalStyles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@context/index";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
