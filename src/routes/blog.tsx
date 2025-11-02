import { createFileRoute } from "@tanstack/react-router";
import { ScrollSpacer } from "~/components/ScrollSpacer";
import { POSTS } from "~/util/posts";
import styles from "./blog.module.scss";

export const Route = createFileRoute("/blog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ScrollSpacer percentage={72} />
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
