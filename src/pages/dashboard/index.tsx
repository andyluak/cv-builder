import React from "react";

import MainLayout from "src/components/layout/Main";
import Section from "src/components/ui/Section";

function Dashboard() {
  return (
    <Section>
      <h1>Dashboard</h1>
    </Section>
  );
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
