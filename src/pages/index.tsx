import { type NextPage } from "next";

import Benefit from "src/components/Homepage/Benefit";
import CTA from "src/components/Homepage/CTA";
import Features from "src/components/Homepage/Features";
import MainLayout from "src/components/layout/Main";

import { handleSignIn } from "src/utils/authHelpers";

import homepageContent from "content/final-homepage-content.json";

import BenefitCustomize from "public/ilustrations/benefit_customize.svg";
import BenefitQuality from "public/ilustrations/benefit_quality.svg";
import BenefitTime from "public/ilustrations/benefit_time.svg";
import FeatureContent from "public/ilustrations/feature_content.svg";
import FeatureTemplate from "public/ilustrations/feature_template.svg";
import HeroResume from "public/ilustrations/hero_resume.svg";

type HomepageContentBase = {
  title: string;
  description: string;
};

type Props = {
  hero: {
    headline: string;
    button: {
      text: string;
      link: string;
    };
  };
  // they are the HomepageContentBase
  features: HomepageContentBase[];
  benefits: HomepageContentBase[];
  stepByStepGuide: HomepageContentBase[];
};

const Home: NextPage<Props, Record<string, never>> = ({
  hero,
  features,
  benefits,
  stepByStepGuide,
}) => {
  const benefitsArray = [BenefitTime, BenefitCustomize, BenefitQuality];
  const featuresArray = [FeatureTemplate, FeatureContent];
  return (
    <>
      <main>
        <div className="prose-xl mt-10 flex flex-col-reverse items-center justify-center gap-4 px-10 py-4 md:flex-row">
          <div className="prose-sm flex flex-col items-center md:items-start md:prose-base lg:prose-lg xl:prose-xl">
            <h1 className="text-center leading-snug md:text-left">
              <span className="font-bold italic">Stand out</span> from the crowd
              with a tailored, professional CV
            </h1>
            <button
              className="rounded-lg bg-accent px-4 py-4"
              onClick={handleSignIn}
            >
              Get Started with your dream job today
            </button>
          </div>

          <div>
            <HeroResume className="h-64 w-64 md:h-96 md:w-96 xl:h-[600px] xl:w-[600px]" />
          </div>
        </div>

        <h2 className="mt-10 text-center text-4xl font-bold lg:text-6xl">
          Why use us?
        </h2>
        <div className="prose-sm md:prose-base lg:prose-lg xl:prose-xl">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              {...benefit}
              SvgComponent={benefitsArray[index]}
              leftImage={index % 2 ? false : true}
            />
          ))}
        </div>

        {/* {CTA} */}
        <CTA
          callToAction="Try our CV builder today and land your dream job"
          buttonLabel="Get started with your dream job today"
          onClick={handleSignIn}
        />

        {/* Features */}
        <h2 className="mt-10 text-center text-4xl font-bold lg:text-6xl">
          Check out our features
        </h2>
        <div className="prose-sm mt-8 grid grid-cols-1 place-content-center place-items-center gap-12 px-6 md:grid-cols-2 md:prose-base lg:prose-lg xl:prose-xl">
          {features.map((feature, index) => (
            <Features
              key={index}
              {...feature}
              SvgComponent={featuresArray[index]}
            />
          ))}
        </div>

        {/* Step by step guide */}
        <h2 className="mt-10 mb-6 text-center text-4xl font-bold lg:mb-12 lg:text-6xl">
          When we said its easy to use, we meant it.
        </h2>
        <div className="prose-sm md:prose-base lg:prose-lg xl:prose-xl">
          <ul className="flex max-w-4xl flex-col items-start lg:max-w-7xl">
            {stepByStepGuide.map((step, index) => (
              <li key={index}>
                <span className="font-bold">{step.title}</span>
                <p>{step.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <CTA
          callToAction="Try our CV builder today and land your dream job"
          buttonLabel="Get started with your dream job today"
          onClick={handleSignIn}
        />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      hero: homepageContent.hero,
      benefits: homepageContent.benefits,
      features: homepageContent.features,
      stepByStepGuide: homepageContent.stepByStepGuide,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Home.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
