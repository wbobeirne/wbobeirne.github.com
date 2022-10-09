import React from "react";
import type { StaticImageData } from "next/image";

// Images -- Static import provides all sorts of info around heights, widths etc.
import servicebellDesktopScreenshot from "../public/screenshots/servicebell-desktop.jpg";
import servicebellMobileScreenshot from "../public/screenshots/servicebell-mobile.jpg";
import jouleDesktopScreenshot from "../public/screenshots/joule-desktop.jpg";
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
          As a part of the founding engineering team, I developed the majority
          of the architecture for ServiceBell, a{" "}
          <strong>live video and voice chat widget</strong> that customers can
          embed into their website to have low friction meetings with
          propsective and existing customers.
        </p>
        <p>
          Beyond just the chat capabilities, ServiceBell also gives you a{" "}
          <strong>
            view of the visitor’s screen, and the ability to draw or control
            their screen
          </strong>{" "}
          and guide them through your website. Both parties can also share their
          entire screens, to be able to debug or demonstrate in real time.
        </p>
        <p>
          <strong>Calls on ServiceBell can be recorded</strong> for sharing and
          viewing. This was achieved using a combination of the latest browser
          media APIs for capturing video streams and uploading them, as well as.
          The synchronized playback is pixel perfect because it renders the
          actual DOM the user had, and is synchronized perfectly with the video.
        </p>
        <p>
          All of this interactivity is done in realtime through a combination of
          server communications via <strong>WebSockets</strong> and peer-to-peer
          communications via <strong>WebRTC</strong>. The React-based widget
          connects to our central backend server via a WebSocket, and has the
          visitor show up in a list. Once an agent clicks on a visitor, a WebRTC
          connection is established to do the heavy lifting of communications.
        </p>
        <p>
          While I focus primarily on the engineering above, I was also heavily
          involved in a lot of product and design decision making. Whether I
          built it or not, most product features received a polishing pass from
          me to ensure it was up to snuff for our customers.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript w/ React.JS &amp; React Native</li>
          <li>Python w/ Flask &amp; Sqlalchemy</li>
          <li>PostgreSQL via AWS RDS</li>
          <li>AWS API Gateway, Lambdas, and MediaConvert</li>
          <li>Cloudflare Workers</li>
          <li>Stripe</li>
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
          The Joule browser extension is a way for Bitcoin Lightning users to
          quickly make payments and authenticate using their Lightning node. By
          injecting a small script into every page, websites can leverage the
          WebLN standard to initiate interactions, a standard I developed
          alongside Joule based on the Ethereum community’s Web3 standard.
        </p>
        <p>
          At its peak, Joule had over 1,500 active users, and was featured in
          many publications and at many conferences. It has also inspired many
          similar open source projects such as Alby and Jolt. The WebLN standard
          has been adopted and extended by many applications, such as Sphinx.
        </p>
        <p>
          The project ceased development in 2021 due to Google’s significant
          changes to the web extensions API.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript w/ React.js &amp; Redux</li>
          <li>Web Extension API</li>
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
          From the developers of code-server, the original VSCode in the browser
          implementation, Coder is building a{" "}
          <strong>powerful and secure IDE</strong> for teams that live in the
          cloud.
        </p>
        <p>
          Teams can onboard and collaborate better than ever before with
          identical provisioned dev machines that are powered by Docker images,
          all managed on a single Kubernetes cluster. Every machine is shareable
          between other members of the team, allowing for the ideal debugging
          experience.
        </p>
        <p>
          In addition to the VSCode IDE in the browser, I was also a part of a
          project called x11wasm, an effort to port any x11 based desktop
          application to the browser using WebGL. We primarily supported the
          JetBrains IDEs, but any app could work.
        </p>
        <p>
          My job responsibilities also included working with the design and
          marketing teams around our public facing content, and managing a team
          of engineers focused on the enterprise dashboard.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript w/ React.js and jQuery</li>
          <li>WebAssembly</li>
          <li>WebGL</li>
          <li>Golang</li>
          <li>PostgreSQL</li>
          <li>Kubernetes &amp; Docker</li>
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
          OkCupid was all about making the ineffible f’able. I worked on
          bringing one of the earliest dating sites up to speed with modern
          designs and performant and fun user experiences.
        </p>
        <p>
          When I first joined, the site was a mix of jQuery and YUI. The
          frontend was delivered with a custom templating language called Pub,
          part of the home grown OKWS, a C++ backend that was made in a time
          before all of the amazing open source web servers and frameworks we
          have today.
        </p>
        <p>
          I was instrumental in guiding the team through the changing frontend
          landscape, adopting standard technology like Webpack and Babel,
          React.js, and SCSS. While I primarily focused on the desktop website,
          I built many experiences in our previously web-based mobile app to
          ship performant and identically function experiences to iOS and
          Android users.
        </p>
        <p>
          Experimentation was core to our product team. I conducted many A/B
          tests, set up analytics tooling for determining experiment
          performance, and finally wrapped my head around what a P actually
          means. Bayes for life.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>JavaScript w/ React.js</li>
          <li>
            C++ w/ OKWS{" "}
            <small>(Custom web server and templating language)</small>
          </li>
          <li>MySQL</li>
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
    description: (
      <>
        <p>
          Our goal with Grant.io was to bring accessibility, accountability, and
          community to the open source funding ecosystem. We came from the open
          source Ethereum community having experienced a lot of misaligned
          incentives and ”tokenomics” that left a bad taste in our mouth, and
          felt that grant funding was a more noble way of getting money and
          building cool stuff.
        </p>
        <p>
          What started as a smart contract driven platform turned into a white
          label service. We worked with organizations like the Zcash Foundation
          and Tlon (urbit) to build a product that allowed them to organize
          projects that needed funding, and match funders and builders together.
        </p>
        <p>
          While our work still stands today, the idea of being a consultancy
          rather than a product company didn’t match with our original vision,
          and we disbanded in 2020.
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>TypeScript w/ React.js</li>
          <li>Python w/ Flask and SQLAlchemy</li>
        </ul>
      </>
    ),
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
          <li>TypeScript w/ React.js</li>
          <li>Electron</li>
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
          Primarily focused on the publishing and government sector, Phase2
          Technology mainly built PHP CMS websites for our clients. In my time
          there, I worked directly with clients at organizations such as the
          PAC-12, Associated Press, Penn State University, and the Whitehouse
          (Yes, <em>that</em> Whitehouse.)
        </p>
        <h3>Technologies used</h3>
        <ul>
          <li>PHP w/ Drupal &amp; CodeIgniter</li>
          <li>MySQL</li>
          <li>Jenkins CI</li>
          <li>Apache Solr</li>
        </ul>
      </>
    ),
  },
  "personal-projects": {
    name: "Personal Projects",
    website: "https://wbobeirne.com",
    shortName: "My Projects",
    title: "The One and Only",
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
          Outside of work I like to kick back, relax, and work some more. I love
          multimedia experiences, and technology is like the missing 6th sense
          for me. I’m at my best when I’m working across multiple disciplines,
          mixing design, engineering, and user experience.
        </p>
        <h3>My favorite tech &amp; tooling</h3>
        <ul>
          <li>All things TypeScript and React</li>
          <li>Jamstack</li>
          <li>Blender</li>
          <li>Figma</li>
          <li>Docker</li>
          <li>Bitcoin &amp; Lightning</li>
        </ul>
      </>
    ),
  },
};

export const PROJECT_ORDER = Object.keys(PROJECTS) as ProjectKey[];
