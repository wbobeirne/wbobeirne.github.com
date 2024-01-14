import type { NextPage } from "next";
import Head from "next/head";
import { ScrollSpacer } from "../../components/ScrollSpacer";
import { Template } from "../../components/Template";
import styles from "./style.module.scss";

import TypeScriptLogo from "../../public/logos/typescript-mono.svg";
import ReactLogo from "../../public/logos/react-mono.svg";
import ThreejsLogo from "../../public/logos/threejs-mono.svg";
import NodeLogo from "../../public/logos/node-mono.svg";
import ElectronLogo from "../../public/logos/electron-mono.svg";
import PythonLogo from "../../public/logos/python-mono.svg";
import PostgresLogo from "../../public/logos/postgres-mono.svg";
import BlenderLogo from "../../public/logos/blender-mono.svg";
import GolangLogo from "../../public/logos/golang-mono.svg";
import DockerLogo from "../../public/logos/docker-mono.svg";
import AwsLogo from "../../public/logos/aws-mono.svg";
import CloudflareLogo from "../../public/logos/cloudflare-mono.svg";

import BicycleIcon from "../../public/icons/bicycle.svg";
import ClimbingIcon from "../../public/icons/climbing.svg";
import LiveMusicIcon from "../../public/icons/live-music.svg";
import CodingIcon from "../../public/icons/coding.svg";
import React from "react";

interface Stuff {
  image: any;
  name: string;
  subtitle?: string;
  color: string;
  darkColor?: string;
}

const tooling: Stuff[] = [
  {
    image: TypeScriptLogo,
    name: "TypeScript",
    subtitle: "and JavaScript",
    color: "#3178C6",
  },
  {
    image: ReactLogo,
    name: "React",
    subtitle: "and React Native",
    color: "#61DAFB",
  },
  {
    image: ThreejsLogo,
    name: "Three.js",
    color: "#000000",
    darkColor: "#FFFFFF",
  },
  {
    image: NodeLogo,
    name: "Node.js",
    color: "#8CC84B",
  },
  {
    image: ElectronLogo,
    name: "Electron",
    color: "#2B2E3A",
    darkColor: "#9FEAF9",
  },
  {
    image: PythonLogo,
    name: "Python",
    color: "#4483B4",
  },
  {
    image: PostgresLogo,
    name: "PostgreSQL",
    subtitle: "and other SQL DBs",
    color: "#336791",
  },
  {
    image: BlenderLogo,
    name: "Blender",
    color: "#EA7600",
  },
  {
    image: GolangLogo,
    name: "Go",
    color: "#01ADD8",
  },
  {
    image: AwsLogo,
    name: "AWS",
    color: "#FF9900",
  },
  {
    image: DockerLogo,
    name: "Docker",
    color: "#0db7ed",
  },
  {
    image: CloudflareLogo,
    name: "Cloudflare",
    color: "#F48120",
  },
];

const hobbies: Stuff[] = [
  {
    image: BicycleIcon,
    name: "Bicycling",
    color: "#444444",
    darkColor: "#FFFFFF",
  },
  {
    image: ClimbingIcon,
    name: "Rock Climbing",
    color: "#8BB19C",
  },
  {
    image: LiveMusicIcon,
    name: "Live music",
    color: "#D37E6B",
  },
  {
    image: CodingIcon,
    name: "Coding",
    subtitle: "like, the fun kind",
    color: "#50B1D4",
  },
];

const Bio: NextPage = () => {
  const makeStuff = (stuff: Stuff[]) => {
    return (
      <div className={styles.stuffs}>
        {tooling.map((tool) => (
          <div
            key={tool.name}
            className={styles.stuff}
            style={
              {
                "--color": tool.color,
                "--darkColor": tool.darkColor,
              } as React.CSSProperties
            }
          >
            <div className={styles.image}>
              <tool.image />
            </div>
            <div className={styles.name}>{tool.name}</div>
            {tool.subtitle && (
              <small className={styles.subtitle}>{tool.subtitle}</small>
            )}
          </div>
        ))}
      </div>
    );
  };

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
    <div className={styles.stuffs}>
      {stuffList.map((stuff) => (
        <div
          key={stuff.name}
          className={styles.stuff}
          style={
            {
              "--color": stuff.color,
              "--darkColor": stuff.darkColor,
            } as React.CSSProperties
          }
        >
          <div className={styles.image}>
            <stuff.image />
          </div>
          <div className={styles.name}>{stuff.name}</div>
          {stuff.subtitle && (
            <small className={styles.subtitle}>{stuff.subtitle}</small>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bio;
