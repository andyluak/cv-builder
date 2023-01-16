import { useRouter } from "next/router";
import React from "react";
import MainLayout from "src/components/layout/Main";
import Loading from "src/components/ui/Loading";
import useResume from "src/queries/useResume";

function Resume() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, isError, resume } = useResume(id);

  if( isLoading) return <Loading message="Loading resume..." />;

  return <div>Resume</div>;
}

export default Resume;

Resume.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
