import React from "react";
import type { StaticImageData } from "next/image";

// Images -- Static import provides all sorts of info around heights, widths etc.
import servicebellDesktopScreenshot from "../public/screenshots/servicebell-desktop.jpg";
import servicebellMobileScreenshot from "../public/screenshots/servicebell-mobile.jpg";
import jouleDesktopScreenshot from "../public/screenshots/joule-desktop-full.png";
import jouleMobileScreenshot from "../public/screenshots/joule-mobile.jpg";
import phase2DesktopScreenshot from "../public/screenshots/phase2-desktop.jpg";
import phase2MobileScreenshot from "../public/screenshots/phase2-mobile.jpg";
import coderDesktopScreenshot from "../public/screenshots/coder-desktop.jpg";
import coderMobileScreenshot from "../public/screenshots/coder-mobile.jpg";
import okcDesktopScreenshot from "../public/screenshots/okc-desktop.jpg";
import okcMobileScreenshot from "../public/screenshots/okc-mobile.jpg";
import grantioDesktopScreenshot from "../public/screenshots/grantio-desktop.jpg";
import grantioMobileScreenshot from "../public/screenshots/grantio-mobile.jpg";
import mycryptoDesktopScreenshot from "../public/screenshots/mycrypto-desktop.jpg";
import mycryptoMobileScreenshot from "../public/screenshots/mycrypto-mobile.jpg";
import projectsDesktopScreenshot from "../public/screenshots/okc-desktop.jpg";
import projectsMobileScreenshot from "../public/screenshots/okc-mobile.jpg";

export interface ProjectInfo {
  name: string;
  shortName?: string;
  title: string;
  website: string;
  dates: string;
  logo: string;
  color: { primary: string; secondary: string };
  screenshots: { desktop: StaticImageData; mobile: StaticImageData };
  description: React.ReactNode;
}

export type ProjectKey =
  | "servicebell"
  | "joule"
  | "phase2"
  | "coder"
  | "okcupid"
  | "grantio"
  | "mycrypto"
  | "personal-projects";

export const PROJECTS: Record<ProjectKey, ProjectInfo> = {
  servicebell: {
    name: "ServiceBell",
    title: "Director of Engineering",
    website: "https://servicebell.com",
    dates: "Feb 2021 - Sep 2022",
    logo: "/logos/servicebell.svg",
    color: { primary: "#e77709", secondary: "#f9f5ec" },
    screenshots: {
      desktop: servicebellDesktopScreenshot,
      mobile: servicebellMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  joule: {
    name: "Joule",
    title: "Creator",
    website: "https://lightningjoule.com",
    dates: "August 2018",
    logo: "/logos/joule.svg",
    color: { primary: "#7642FF", secondary: "#E9E1FF" },
    screenshots: {
      desktop: jouleDesktopScreenshot,
      mobile: jouleMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  phase2: {
    name: "Phase2 Technology",
    shortName: "Phase2",
    website: "https://phase2technology.com",
    title: "Software Engineer",
    dates: "Jan 2012 - Jul 2013",
    logo: "/logos/phase2.svg",
    color: { primary: "#FF7901", secondary: "#FFF4EB" },
    screenshots: {
      desktop: phase2DesktopScreenshot,
      mobile: phase2MobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  coder: {
    name: "Coder",
    title: "Engineering Manager / Staff Software Engineer",
    website: "https://coder.com",
    dates: "Sep 2019 - Dec 2020",
    logo: "/logos/coder.svg",
    color: { primary: "#FFFFFF", secondary: "#2773df" },
    screenshots: {
      desktop: coderDesktopScreenshot,
      mobile: coderMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  okcupid: {
    name: "OkCupid",
    title: "Senior Software Engineer",
    website: "https://okcupid.com",
    dates: "Aug 2013 - Deb 2017",
    logo: "/logos/okcupid.svg",
    color: { primary: "#ffffff", secondary: "#5da3ff" },
    screenshots: {
      desktop: okcDesktopScreenshot,
      mobile: okcMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  grantio: {
    name: "Grant.io",
    title: "Co-founder",
    website: "https://grant.io",
    dates: "Sep 2018 - Jul 2019",
    logo: "/logos/grantio.svg",
    color: { primary: "#ffffff", secondary: "#530EEC" },
    screenshots: {
      desktop: grantioDesktopScreenshot,
      mobile: grantioMobileScreenshot,
    },
    description: <></>,
  },
  mycrypto: {
    name: "MyCrypto",
    title: "Software Engineer",
    website: "https://mycrypto.com",
    dates: "Sep 2017 - Jun 2018",
    logo: "/logos/mycrypto.svg",
    color: { primary: "#FFFFFF", secondary: "#163150" },
    screenshots: {
      desktop: mycryptoDesktopScreenshot,
      mobile: mycryptoMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
  "personal-projects": {
    name: "Personal Projects",
    website: "https://wbobeirne.com",
    shortName: "My Projects",
    title: "The Dude",
    dates: "Nov 1993 - ∞",
    logo: "/logos/projects.svg",
    color: { primary: "#FFFFFF", secondary: "#EF233C" },
    screenshots: {
      desktop: projectsDesktopScreenshot,
      mobile: projectsMobileScreenshot,
    },
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum
          massa in arcu luctus, vel commodo dolor ullamcorper. Curabitur cursus
          facilisis felis. Duis bibendum, quam et elementum dignissim, justo
          mauris accumsan nisi, et mattis diam erat ut odio.
        </p>
        <p>
          Aliquam tincidunt tincidunt eros id dignissim. Duis in turpis libero.
          Nunc eleifend lacus non semper tincidunt. Sed feugiat lorem nec dui
          fringilla auctor. Sed viverra vulputate orci ac lobortis. Curabitur
          ultrices velit in facilisis facilisis.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript</li>
          <li>React.js</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Node.JS</li>
        </ul>
      </>
    ),
  },
};

export const PROJECT_ORDER = Object.keys(PROJECTS) as ProjectKey[];
