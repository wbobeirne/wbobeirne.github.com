import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Template } from "../../components/Template";
import { POSTS } from "../../util/posts";
import styles from "./style.module.scss";

const Blog: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Blog | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {POSTS.map((post) => (
          <Link key={post.url} href={post.url}>
            <a
              className={styles.post}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={post.image} alt="" placeholder="blur" />
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.preview}>{post.preview}</p>
              <div className={styles.readMore}>Read more →</div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.scrollSpacer} />
    </Template>
  );
};

export default Blog;
