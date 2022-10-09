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
        </p>
        <h3>Some of the stuff I like to work with</h3>
        <div className={styles.stuffs}>
          <div className={styles.stuff}>TypeScript</div>
          <div className={styles.stuff}>React.js</div>
          <div className={styles.stuff}>React Native</div>
          <div className={styles.stuff}>Node.js</div>
          <div className={styles.stuff}>Electron</div>
          <div className={styles.stuff}>Python</div>
          <div className={styles.stuff}>PostgreSQL</div>
        </div>
        <h3>Some of my hobbies</h3>
        <div className={styles.stuffs}>
          <div className={styles.stuff}>Bicycling</div>
          <div className={styles.stuff}>Rock Climbing</div>
          <div className={styles.stuff}>Programming (like, for fun)</div>
          <div className={styles.stuff}>Live music</div>
        </div>
      </div>
      <div className={styles.scrollSpacer} />
    </Template>
  );
};

export default Bio;
