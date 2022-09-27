import { useIsPresent } from "framer-motion";
import type { NextPage, GetStaticPathsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Template } from "../../components/Template";
import { WorkProject } from "../../components/WorkProject";
import { PROJECTS, PROJECT_ORDER } from "../../util/projects";
import styles from "./style.module.scss";

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
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [projectsWidth, setProjectsWidth] = useState(600);

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

  useEffect(() => {
    const updateProjectsWidth = () => {
      const el = projectsRef.current;
      if (!el) return;
      setProjectsWidth(el.clientWidth);
    };
    updateProjectsWidth();
    window.addEventListener("resize", updateProjectsWidth);
    return () => window.removeEventListener("resize", updateProjectsWidth);
  }, [projectsRef]);

  return (
    <Template>
      <Head>
        <title>Work | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.projects} ref={projectsRef}>
        {PROJECT_ORDER.map((project, index) => (
          <WorkProject
            key={project}
            id={project}
            isActive={project === activeProject}
            index={index}
            containerWidth={projectsWidth}
            {...PROJECTS[project as keyof typeof PROJECTS]}
          />
        ))}
      </div>
    </Template>
  );
};

export default Work;
