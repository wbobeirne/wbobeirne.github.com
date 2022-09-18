import type { NextPage, GetStaticPathsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Template } from "../../components/Template";
import { WorkProject } from "../../components/WorkProject";

const PROJECTS = {
  servicebell: {
    name: "ServiceBell",
    logo: "/logos/servicebell.svg",
  },
  coder: {
    name: "Coder",
    logo: "/logos/coder.svg",
  },
  joule: {
    name: "Joule",
    logo: "/logos/joule.svg",
  },
  grantio: {
    name: "Grant.io",
    logo: "/logos/grantio.svg",
  },
  okcupid: {
    name: "OkCupid",
    logo: "/logos/okcupid.svg",
  },
  mycrypto: {
    name: "MyCrypto",
    logo: "/logos/mycrypto.svg",
  },
  phase2: {
    name: "Phase2 Technology",
    logo: "/logos/phase2.svg",
  },
  projects: {
    name: "Personal Projects",
    logo: "/logos/phase2.svg",
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
  const activeProject = useRouter().query.project as string | null;

  return (
    <Template>
      <Head>
        <title>Work | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ paddingLeft: 24 }}>
        {PROJECT_ORDER.map((project) => (
          <WorkProject
            key={project}
            id={project}
            description="TODO"
            isActive={project === activeProject}
            {...PROJECTS[project]}
          />
        ))}
      </div>
    </Template>
  );
};

export default Work;
