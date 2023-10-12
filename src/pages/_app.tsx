import { DefaultLayout } from "@/layout/DefaultLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import "animate.css";
import "@/styles/globals.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1 * (60 * 1000),
      cacheTime: 1 * (60 * 1000),
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Budget Buddy</title>
        <meta name="og:title" content="Budget Buddy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
