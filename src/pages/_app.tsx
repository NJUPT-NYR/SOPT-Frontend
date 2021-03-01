import React from "react";
import "@/global.css";
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_ENABLE_MOCK) {
  import("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
