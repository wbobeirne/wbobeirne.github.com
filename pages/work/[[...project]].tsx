import type { NextPage, GetStaticPathsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollSpacer } from "../../components/ScrollSpacer";
import { Template } from "../../components/Template";
import { WorkProject } from "../../components/WorkProject";
import { useAppContext } from "../../contexts/app";
import { useHasRendered, useUpdatingRef } from "../../util/hooks";
import { ProjectKey, PROJECTS, PROJECT_ORDER } from "../../util/projects";
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

function getProjectQuery(q: string | string[] | undefined): ProjectKey | null {
  const key = Array.isArray(q) ? q[0] : q;
  if (key && key in PROJECTS) {
    return key as ProjectKey;
  }
  return null;
}

const Work: NextPage = () => {
  const router = useRouter();
  const { setActiveProject: setContextActiveProject, setIsViewingProjects } =
    useAppContext();
  const [activeProject, setActiveProject] = useState(
    getProjectQuery(router.query.project),
  );
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const hasRenderedRef = useUpdatingRef(useHasRendered());

  // Update activeProject, but only if we're not animating out.
  useEffect(() => {
    setActiveProject(getProjectQuery(router.query.project));
  }, [router.query.project]);

  // Reset scroll when changing to activeProject
  useEffect(() => {
    if (!activeProject && !hasRenderedRef.current) return;
    if (projectsRef.current) {
      const desiredTop = projectsRef.current.offsetTop;
      const delta = Math.abs(desiredTop - window.scrollY);
      if (delta > 60) {
        window.scrollTo({
          top: desiredTop,
          behavior: hasRenderedRef.current ? "smooth" : undefined,
        });
      }
    }
  }, [activeProject, hasRenderedRef]);

  // Update context when activeProject changes
  useEffect(() => {
    setContextActiveProject(activeProject);
  }, [activeProject, setContextActiveProject]);

  // Update context when projects is in view
  useEffect(() => {
    setIsViewingProjects(true);
    return () => {
      setIsViewingProjects(false);
    };
  }, [setIsViewingProjects]);

  return (
    <Template>
      <Head>
        <title>
          {activeProject ? PROJECTS[activeProject].name : "Work"} | William
          O’Beirne
        </title>
        <meta
          name="description"
          content={
            activeProject
              ? `I worked on ${PROJECTS[activeProject].name}, it was pretty cool.`
              : "I've worked on a lot of things, here are a few of them."
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollSpacer percentage={80} />
      {/* Wrapper div to receive template min-height */}
      <div>
        <div className={styles.projects} ref={projectsRef}>
          {PROJECT_ORDER.map((project, index) => (
            <WorkProject
              key={project}
              id={project}
              isActive={project === activeProject}
              isInactive={activeProject ? project !== activeProject : false}
              index={index}
            />
          ))}
        </div>
      </div>
    </Template>
  );
};

export default Work;
