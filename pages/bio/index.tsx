import type { NextPage } from "next";
import Head from "next/head";
import { ScrollSpacer } from "../../components/ScrollSpacer";
import { Template } from "../../components/Template";
import styles from "./style.module.scss";

import React from "react";

interface Stuff {
  name: string;
  subtitle?: string;
  color: string;
  darkColor?: string;
}

const tooling: Stuff[] = [
  {
    name: "TypeScript",
    subtitle: "and JavaScript",
    color: "#3178C6",
  },
  {
    name: "React",
    subtitle: "and React Native",
    color: "#61DAFB",
  },
  {
    name: "Three.js",
    color: "#000000",
    darkColor: "#FFFFFF",
  },
  {
    name: "Node.js",
    color: "#8CC84B",
  },
  {
    name: "Electron",
    color: "#2B2E3A",
    darkColor: "#9FEAF9",
  },
  {
    name: "Python",
    color: "#4483B4",
  },
  {
    name: "PostgreSQL",
    subtitle: "and other SQL DBs",
    color: "#336791",
  },
  {
    name: "Blender",
    color: "#EA7600",
  },
  {
    name: "Go",
    color: "#01ADD8",
  },
  {
    name: "AWS",
    color: "#FF9900",
  },
  {
    name: "Docker",
    color: "#0db7ed",
  },
  {
    name: "Cloudflare",
    color: "#F48120",
  },
];

const hobbies: Stuff[] = [
  {
    name: "Bicycling",
    color: "#444444",
    darkColor: "#FFFFFF",
  },
  {
    name: "Rock Climbing",
    color: "#8BB19C",
  },
  {
    name: "Live music",
    color: "#D37E6B",
  },
  {
    name: "Coding",
    subtitle: "the after-hours fun kind",
    color: "#50B1D4",
  },
];

const Bio: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Bio | William O’Beirne</title>
        <meta name="description" content="Learn all about me!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollSpacer percentage={80} />
      <div className={styles.container}>
        <p>
          Hey, I’m <strong>Will O’Beirne</strong>. Thanks for dropping by my
          site.
        </p>
        <p>
          I’ve been doing <strong>Software Engineering</strong> professionally
          since 2012, but my love of coding goes much further back then that. I
          got started with game development when I was a kid, and have continued
          to bring that focus on <span className={styles.fun}>fun</span> even in
          my professional work.
        </p>
        <p>
          I’m currently based in <strong>Austin, TX</strong> and open to new
          engineering opportunities in the area. Feel free to reach out on{" "}
          <a
            href="https://www.linkedin.com/in/wbobeirne"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href="https://twitter.com/wbobeirne"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          . You can also find my open source work on{" "}
          <a
            href="https://github.com/wbobeirne"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <h3>My favorite tools</h3>
        <StuffList stuffList={tooling} />
        <h3>My hobbies</h3>
        <StuffList stuffList={hobbies} />
      </div>
    </Template>
  );
};

const StuffList: React.FC<{ stuffList: Stuff[] }> = ({ stuffList }) => {
  return (
    <ul className={styles.stuffs}>
      {stuffList.map((stuff) => (
        <li
          key={stuff.name}
          className={styles.stuff}
          style={
            {
              "--color": stuff.color,
              "--color-dark": stuff.darkColor,
            } as React.CSSProperties
          }
        >
          <div className={styles.name}>{stuff.name}</div>
          {stuff.subtitle && (
            <small className={styles.subtitle}>({stuff.subtitle})</small>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Bio;
