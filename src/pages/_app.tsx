/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ResumeProvider } from "src/context/ResumeContext";

import "../styles/globals.css";

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
          {getLayout(<Component {...pageProps} />)}
        </ResumeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
