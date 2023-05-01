import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAtom } from "jotai";
import { sessionAtom, sessionLoadingAtom } from "@/atoms/session";
import { validateSession } from "@/client/user-client";
import { LoadingState } from "@/components/Loading/LoadingState";

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useAtom(sessionLoadingAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const router = useRouter();
  const redirectPage = "/budget";
  const sessionPages = ["/", "/sign-up"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await validateSession();

        if (error) {
          throw error;
        } else if (data.session) {
          setSession(data.session);
          if (sessionPages.includes(router.asPath)) {
            router.replace(redirectPage);
          }
        } else {
          if (!sessionPages.includes(router.asPath)) {
            router.replace("/");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    //eslint-disable-next-line
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
        <main className="w-full p-4 bg-[rgb(241,245,249)] min-h-[100dvh]">
          <div className="max-w-md mx-auto">{children}</div>
        </main>
      )}
    </>
  );
};
