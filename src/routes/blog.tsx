import { createFileRoute } from "@tanstack/react-router";
import { ScrollSpacer } from "~/components/ScrollSpacer";
import { POSTS } from "~/util/posts";
import styles from "./blog.module.scss";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      {
        title: "Blog | William O’Beirne",
      },
      {
        name: "description",
        content:
          "Sometimes I write things. Even less frequently I publish them.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ScrollSpacer percentage={80} />
      <div className={styles.posts}>
        {POSTS.map((post) => (
          <a
            key={post.url}
            href={post.url}
            className={styles.post}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.image}>
              <img src={post.image} alt="" />
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.preview}>{post.preview}</p>
            <div className={styles.readMore}>Read more →</div>
          </a>
        ))}
      </div>
    </>
  );
}
