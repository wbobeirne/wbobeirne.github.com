import { createFileRoute, redirect } from "@tanstack/react-router";
import { ScrollSpacer } from "~/components/ScrollSpacer";
import { WorkProject } from "~/components/WorkProject";
import { PROJECT_ORDER, ProjectKey, PROJECTS } from "~/util/projects";
import styles from "./{-$projectId}.module.scss";

export const Route = createFileRoute("/work/{-$projectId}")({
  beforeLoad: ({ params: { projectId } }) => {
    const project = PROJECTS[projectId as ProjectKey];
    if (projectId && !project) {
      throw redirect({
        to: "/work/{-$projectId}",
        params: { projectId: undefined },
      });
    }
  },
  head: ({ params: { projectId } }) => {
    const project = PROJECTS[projectId as ProjectKey];
    return {
      meta: [
        {
          title: [project?.name, "Work", "William O’Beirne"]
            .filter(Boolean)
            .join(" | "),
        },
        {
          name: "description",
          content: project
            ? project.description.trim().split("\n")[0]
            : "I've worked on a lot of things, here are a few of them.",
        },
      ],
    };
  },
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
