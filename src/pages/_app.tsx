import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Hero from "@/components/Hero-en";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
