import type { NextPage } from "next";
import Head from "next/head";
import { Template } from "../../components/Template";
import styles from "./style.module.scss";

const Bio: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Bio | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <p>
          Hey, I’m <strong>Will O’Beirne</strong>. Thanks for dropping by my
          site.
        </p>
        <p>
          I’ve been doing <strong>Software Engineering</strong> professionally
          since 2012, but my love of coding goes much further back then that.
          Ever since I was a wee lad, I always liked knowing how computers did
          what they do.
        </p>
      </div>
    </Template>
  );
};

export default Bio;
