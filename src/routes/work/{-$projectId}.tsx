import { createFileRoute, notFound } from "@tanstack/react-router";
import { ScrollSpacer } from "~/components/ScrollSpacer";
import {
  PROJECT_ORDER,
  ProjectInfo,
  ProjectKey,
  PROJECTS,
} from "~/util/projects";
import styles from "./{-$projectId}.module.scss";
import { WorkProject } from "~/components/WorkProject";

export const Route = createFileRoute("/work/{-$projectId}")({
  component: RouteComponent,
  loader: ({ params: { projectId } }) => {
    let project: ProjectInfo | undefined;
    if (projectId) {
      project = PROJECTS[projectId as ProjectKey];
      if (!project) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw notFound();
      }
    }
    return { project };
  },
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  return (
    <>
      <ScrollSpacer percentage={80} />
      <div style={{ pointerEvents: "none" }}>
        <div className={styles.projects}>
          {PROJECT_ORDER.map((id, index) => (
            <WorkProject
              key={id}
              id={id}
              isActive={id === project?.id}
              isInactive={project ? id !== project.id : false}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
