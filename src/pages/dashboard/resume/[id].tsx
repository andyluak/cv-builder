import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/router";
import React from "react";
import useResume from "src/queries/useResume";

import MainLayout from "src/components/layout/Main";
import Loading from "src/components/ui/Loading";

function Resume() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, isError, resume } = useResume(id);

  if (isLoading) return <Loading message="Loading resume..." />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      <Accordion.Root type="single">
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Is it unstyled?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <div>Job SAl</div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Header>Education</Accordion.Header>
          <Accordion.Content>
            <div>Education</div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

export default Resume;

Resume.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
