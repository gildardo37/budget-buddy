import Head from "next/head";

export default function Custom404() {
  return (
    <section className="grid h-[calc(100dvh-32px)] w-full place-content-center gap-4 text-center">
      <Head>
        <title>404 - Page not found | Budget Buddy</title>
      </Head>
      <h1 className="text-2xl font-bold md:text-4xl">404 - Page Not Found.</h1>
      <p>
        Go back to {/* eslint-disable-next-line */}
        <a href="/" className="text-blue-600 underline">
          home
        </a>
        .
      </p>
    </section>
  );
}
