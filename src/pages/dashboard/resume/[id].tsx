import { useRouter } from "next/router";
import React from "react";
import useResume from "src/queries/useResume";

import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Loading from "src/components/ui/Loading";

function Resume() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, isError, resume } = useResume(id);

  if (isLoading) return <Loading message="Loading resume..." />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      <Accordion
        title="Education"
        content="Education content"
        value="education"
        type="single"
        collapsible
      />
    </div>
  );
}

export default Resume;

Resume.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
