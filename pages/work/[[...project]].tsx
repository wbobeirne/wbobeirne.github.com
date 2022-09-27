import { useIsPresent } from "framer-motion";
import type { NextPage, GetStaticPathsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Template } from "../../components/Template";
import { WorkProject } from "../../components/WorkProject";
import styles from "./style.module.scss";

export interface ProjectInfo {
  name: string;
  shortName?: string;
  dates: string;
  logo: string;
  color: { primary: string; secondary: string };
}

const PROJECTS = {
  servicebell: {
    name: "ServiceBell",
    dates: "Feb 2021 - Sep 2022",
    logo: "/logos/servicebell.svg",
    color: { primary: "#e77709", secondary: "#f9f5ec" },
  },
  joule: {
    name: "Joule",
    dates: "August 2018",
    logo: "/logos/joule.svg",
    color: { primary: "#7642FF", secondary: "#E9E1FF" },
  },
  phase2: {
    name: "Phase2 Technology",
    shortName: "Phase2",
    dates: "Jan 2012 - Jul 2013",
    logo: "/logos/phase2.svg",
    color: { primary: "#FF7901", secondary: "#FFF4EB" },
  },
  coder: {
    name: "Coder",
    dates: "Sep 2019 - Dec 2020",
    logo: "/logos/coder.svg",
    color: { primary: "#FFFFFF", secondary: "#2773df" },
  },
  okcupid: {
    name: "OkCupid",
    dates: "Aug 2013 - Deb 2017",
    logo: "/logos/okcupid.svg",
    color: { primary: "#ffffff", secondary: "#5da3ff" },
  },
  grantio: {
    name: "Grant.io",
    dates: "Sep 2018 - Jul 2019",
    logo: "/logos/grantio.svg",
    color: { primary: "#ffffff", secondary: "#530EEC" },
  },
  mycrypto: {
    name: "MyCrypto",
    dates: "Sep 2017 - Jun 2018",
    logo: "/logos/mycrypto.svg",
    color: { primary: "#FFFFFF", secondary: "#163150" },
  },
  projects: {
    name: "Personal Projects",
    shortName: "My Projects",
    dates: "Nov 1993 - ∞",
    logo: "/logos/projects.svg",
    color: { primary: "#FFFFFF", secondary: "#EF233C" },
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

function getProjectQuery(q: string | string[] | undefined) {
  if (Array.isArray(q)) {
    return q[0];
  }
  return q;
}

const Work: NextPage = () => {
  const router = useRouter();
  const isPresent = useIsPresent();
  const [activeProject, setActiveProject] = useState(
    getProjectQuery(router.query.project)
  );
  const projects = activeProject ? [activeProject] : PROJECT_ORDER;

  // Update activeProject, but only if we're not animating out.
  useEffect(() => {
    if (isPresent) {
      setActiveProject(getProjectQuery(router.query.project));
    }
  }, [isPresent, router.query.project]);

  useEffect(() => {
    if (activeProject) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeProject]);

  return (
    <Template>
      <Head>
        <title>Work | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.projects}>
        {PROJECT_ORDER.map((project) => (
          <WorkProject
            key={project}
            id={project}
            description="TODO"
            isActive={project === activeProject}
            {...PROJECTS[project as keyof typeof PROJECTS]}
          />
        ))}
      </div>
    </Template>
  );
};

export default Work;
