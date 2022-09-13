import type { NextPage, GetStaticPathsResult } from "next";
import Head from "next/head";

const PROJECTS = {
  servicebell: {
    name: "ServiceBell",
  },
  coder: {
    name: "Coder",
  },
  grantio: {
    name: "Grant.io",
  },
  joule: {
    name: "Joule",
  },
  okcupid: {
    name: "OkCupid",
  },
  mycrypto: {
    name: "MyCrypto",
  },
  phase2: {
    name: "Phase2 Technology",
  },
  abc: {
    name: "Association to Benefit Children",
  },
  projects: {
    name: "Personal Projects",
  },
};
const PROJECT_ORDER = Object.keys(PROJECTS) as Array<keyof typeof PROJECTS>;

// Generate pages for real projects, 404 if not in list.
export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [
      { params: { project: undefined } },
      ...PROJECT_ORDER.map((p) => ({ params: { project: [p] } })),
    ],
    fallback: false,
  };
}

// No-op, required by getStaticPaths.
export function getStaticProps() {
  return {
    props: {},
  };
}

const Work: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Work | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {PROJECT_ORDER.map((project) => (
          <div key={project}>{PROJECTS[project].name}</div>
        ))}
      </div>
    </div>
  );
};

export default Work;
