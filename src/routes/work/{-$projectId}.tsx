import { createFileRoute } from "@tanstack/react-router";
import { ScrollSpacer } from "~/components/ScrollSpacer";
import { PROJECT_ORDER, ProjectKey, PROJECTS } from "~/util/projects";
import styles from "./{-$projectId}.module.scss";
import { WorkProject } from "~/components/WorkProject";

export const Route = createFileRoute("/work/{-$projectId}")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const project = PROJECTS[projectId as ProjectKey];
  return (
    <>
      <ScrollSpacer percentage={80} />
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
    </>
  );
}
