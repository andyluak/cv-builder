/* eslint-disable @typescript-eslint/no-explicit-any */
import { Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cx from "clsx";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ResumeProvider } from "src/context/ResumeContext";

import "../styles/globals.css";

const poppins = Poppins({
  weight: ["400","500", "700", "900"],
  style: "normal",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
});

// extend component type

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: any;
  pageProps: any;
}) => {
  const getLayout = Component.getLayout || ((page: unknown) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ResumeProvider>
          <>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
          </>
          {getLayout(<Component {...pageProps} />)}
        </ResumeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
