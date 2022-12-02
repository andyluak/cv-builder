import Image from "next/image";
import React from "react";

import MainLayout from "src/components/layout/Main";
import Section from "src/components/ui/Section";

import RemoteWork from "public/ilustrations/remote-work.svg";

function Dashboard() {
  return (
    <Section>
      <h1>Dashboard</h1>
      <div className="bg-gray-300 overflow-hidden">
        <RemoteWork className="text-gray-700 w-72 h-72"/>
      </div>
    </Section>
  );
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
