import React from "react";

import MainLayout from "src/components/layout/Main";
import Section from "src/components/ui/Section";

import ResumeList from "src/containers/ResumeList";

function Dashboard() {
  return (
    <Section>
      <ResumeList />
    </Section>
  );
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
