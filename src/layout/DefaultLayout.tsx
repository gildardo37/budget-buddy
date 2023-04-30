import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { sessionAtom, sessionLoadingAtom } from "@/atoms/session";
import { validateSession } from "@/client/client-api";
import { useAtom } from "jotai";
import { LoadingState } from "@/components/Loading/LoadingState";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useAtom(sessionLoadingAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const router = useRouter();
  const redirectPage = "/overview";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await validateSession();

        if (error) {
          throw error;
        } else if (data.session) {
          setSession(data.session);
          console.log("Router...", router);
          if (router.asPath !== redirectPage) {
            router.replace(redirectPage);
          }
        } else {
          console.log("Something error ocurred...");
          router.replace("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={loading && !session ? "rgb(59 130 246)" : "rgb(241 245 249)"}
        />
      </Head>
      {loading && !session ? (
        <LoadingState />
      ) : (
        <main className="w-full p-4 bg-slate-100 min-h-[100dvh]">
          <div className="max-w-md mx-auto">{children}</div>
        </main>
      )}
    </>
  );
};
