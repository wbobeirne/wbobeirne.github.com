import { ComponentType, SVGProps } from "react";
import iconLogo from "~public/logos/icon.svg?react";
import fediLogo from "~public/logos/fedi.svg?react";
import fediDesktopScreenshot from "~public/screenshots/fedi-desktop.jpg";
import fediMobileScreenshot from "~public/screenshots/fedi-mobile.jpg";
import servicebellLogo from "~public/logos/servicebell.svg?react";
import servicebellDesktopScreenshot from "~public/screenshots/servicebell-desktop.jpg";
import servicebellMobileScreenshot from "~public/screenshots/servicebell-mobile.jpg";
// import jouleLogo from "~public/logos/joule.svg?react";
// import jouleDesktopScreenshot from "~public/screenshots/joule-desktop.jpg";
// import jouleMobileScreenshot from "~public/screenshots/joule-mobile.jpg";
import phase2Logo from "~public/logos/phase2.svg?react";
import phase2DesktopScreenshot from "~public/screenshots/phase2-desktop.jpg";
import phase2MobileScreenshot from "~public/screenshots/phase2-mobile.jpg";
import coderLogo from "~public/logos/coder.svg?react";
import coderDesktopScreenshot from "~public/screenshots/coder-desktop.jpg";
import coderMobileScreenshot from "~public/screenshots/coder-mobile.jpg";
import okcLogo from "~public/logos/okcupid.svg?react";
import okcDesktopScreenshot from "~public/screenshots/okc-desktop.jpg";
import okcMobileScreenshot from "~public/screenshots/okc-mobile.jpg";
import grantioLogo from "~public/logos/grantio.svg?react";
import grantioDesktopScreenshot from "~public/screenshots/grantio-desktop.jpg";
import grantioMobileScreenshot from "~public/screenshots/grantio-mobile-zcash.jpg";
import mycryptoLogo from "~public/logos/mycrypto.svg?react";
import mycryptoDesktopScreenshot from "~public/screenshots/mycrypto-desktop.jpg";
import mycryptoMobileScreenshot from "~public/screenshots/mycrypto-mobile.jpg";
import projectsLogo from "~public/logos/projects.svg?react";
import projectsDesktopScreenshot from "~public/screenshots/personal-projects-desktop.jpg";
import projectsMobileScreenshot from "~public/screenshots/personal-projects-mobile.jpg";

export interface ProjectInfo {
  id: ProjectKey;
  name: string;
  shortName?: string;
  title: string;
  website: string;
  dates: string;
  color: { primary: string; secondary: string };
  screenshots: { desktop: string; mobile: string };
  description: string;
}

export type ProjectKey =
  | "icon"
  | "fedi"
  | "servicebell"
  // | "joule"
  | "phase2"
  | "coder"
  | "okcupid"
  | "grantio"
  | "mycrypto"
  | "personal-projects";

export const PROJECTS: Record<ProjectKey, ProjectInfo> = {
  icon: {
    id: "icon",
    name: "ICON",
    title: "Senior Software Engineer II",
    website: "https://iconbuild.com",
    dates: "Feb 2024 - Present",
    color: { primary: "#0f0e0f", secondary: "#FFFFFF" },
    screenshots: {
      desktop: fediDesktopScreenshot,
      mobile: fediMobileScreenshot,
    },
    description: `
ICON develops advanced construction technologies that advance humanity by using 3D printing robotics, software and advanced materials.

As a senior software engineer at ICON, I had a hand in everything from back of house operations for the sales and marketing team, to the actual construction software for architects and print operators.

I'm most proud of the fully interactive 3D apps that provided a digital twin of homes we printed, which gave site planners the ability to lay out entire construction sites with perfect precision, and printer operators the ability to visually verify instructions and accuracy with a tablet on-site.

### Technologies used
- TypeScript
- Three.js
- PostgreSQL
- AWS and CDK
    `,
  },
  fedi: {
    id: "fedi",
    name: "Fedi",
    title: "Software Engineer",
    website: "https://fedi.xyz",
    dates: "Mar 2023 - Jan 2024",
    color: { primary: "#FFFFFF", secondary: "#313538" },
    screenshots: {
      desktop: fediDesktopScreenshot,
      mobile: fediMobileScreenshot,
    },
    description: `
Fedi combines chat, money, and more in one community super-app, run by and for communities and their members.

Built on top of the Fedimint and Matrix protocols, Fedi is a fully decentralized and federated platform that gives users full control over their data and interactions.

As a software engineer at Fedi, I had the unique challenge of building a mobile app and progressive web app that both provided an excellent user experience, while maintaining the security and privacy assurances that were core to the product.

### Technologies used
- TypeScript w/ React.js & React Native
- Matrix
- Rust w/ WebAssembly & FFI
    `,
  },
  servicebell: {
    id: "servicebell",
    name: "ServiceBell",
    title: "Director of Engineering",
    website: "https://servicebell.com",
    dates: "Feb 2021 - Sep 2022",
    color: { primary: "#e77709", secondary: "#f9f5ec" },
    screenshots: {
      desktop: servicebellDesktopScreenshot,
      mobile: servicebellMobileScreenshot,
    },
    description: `
As a part of the founding engineering team, I developed the majority of the architecture for ServiceBell, a **live video and voice chat widget** that customers can embed into their website to have low friction meetings with propsective and existing customers.

Beyond just the chat capabilities, ServiceBell also gives you a **view of the visitor's screen, and the ability to draw or control their screen** and guide them through your website. Both parties can also share their entire screens, to be able to debug or demonstrate in real time.

**Calls on ServiceBell can be recorded** for sharing and viewing. This was achieved using a combination of the latest browser media APIs for capturing video streams and uploading them, as well as. The synchronized playback is pixel perfect because it renders the actual DOM the user had, and is synchronized perfectly with the video.

All of this interactivity is done in realtime through a combination of server communications via **WebSockets** and peer-to-peer communications via **WebRTC**. The React-based widget connects to our central backend server via a WebSocket, and has the visitor show up in a list. Once an agent clicks on a visitor, a WebRTC connection is established to do the heavy lifting of communications.

While I focus primarily on the engineering above, I was also heavily involved in a lot of **product and design decision making**. Whether I built it or not, most product features received a polishing pass from me to ensure it was up to snuff for our customers.

### Technologies used
- TypeScript w/ React.JS & React Native
- Python w/ Flask & Sqlalchemy
- PostgreSQL
- AWS and CDK
- Cloudflare Workers
- Stripe
    `,
  },
  coder: {
    id: "coder",
    name: "Coder",
    title: "Engineering Manager / Staff Software Engineer",
    website: "https://coder.com",
    dates: "Sep 2019 - Dec 2020",
    color: { primary: "#FFFFFF", secondary: "#2B3854" },
    screenshots: {
      desktop: coderDesktopScreenshot,
      mobile: coderMobileScreenshot,
    },
    description: `
From the developers of code-server, the original VSCode in the browser implementation, Coder is building a **powerful and secure IDE** for teams that live in the cloud.

Teams can onboard and collaborate better than ever before with identical provisioned dev machines that are powered by Docker images, all managed on a single Kubernetes cluster. Every machine is shareable between other members of the team, allowing for the ideal debugging experience.

In addition to the VSCode IDE in the browser, I was also a part of a project called x11wasm, an effort to port any x11 based desktop application to the browser using WebGL. We primarily supported the JetBrains IDEs, but any app could work.

My job responsibilities also included working with the design and marketing teams around our public facing content, and managing a team of engineers focused on the enterprise dashboard.

### Technologies used
- TypeScript w/ React.js
- WebAssembly
- WebGL
- Golang
- PostgreSQL
- Kubernetes & Docker
    `,
  },
  okcupid: {
    id: "okcupid",
    name: "OkCupid",
    title: "Senior Software Engineer",
    website: "https://okcupid.com",
    dates: "Aug 2013 - Deb 2017",
    color: { primary: "#ffffff", secondary: "#0F4DA2" },
    screenshots: {
      desktop: okcDesktopScreenshot,
      mobile: okcMobileScreenshot,
    },
    description: `
OkCupid was all about making the ineffible f'able. I worked on bringing one of the earliest dating sites up to speed with modern designs and performant and fun user experiences.

When I first joined, the site was a mix of jQuery and YUI. The frontend was delivered with a custom templating language called Pub, part of the home grown OKWS, a C++ backend that was made in a time before all of the amazing open source web servers and frameworks we have today.

I was instrumental in guiding the team through the changing frontend landscape, adopting standard technology like Webpack and Babel, React.js, and SCSS. While I primarily focused on the desktop website, I built many experiences in our previously web-based mobile app to ship performant and identically function experiences to iOS and Android users.

Experimentation was core to our product team. I conducted many A/B tests, set up analytics tooling for determining experiment performance, and finally wrapped my head around what a P actually means. Bayes for life.

### Technologies used
- JavaScript w/ React.js
- C++ w/ OKWS *(Custom web server and templating language)*
- MySQL
    `,
  },
  //   joule: {
  //     id: "joule",
  //     name: "Joule",
  //     title: "Creator",
  //     website: "https://lightningjoule.com",
  //     dates: "August 2018",
  //     color: { primary: "#7642FF", secondary: "#E9E1FF" },
  //     screenshots: {
  //       desktop: jouleDesktopScreenshot,
  //       mobile: jouleMobileScreenshot,
  //     },
  //     description: `
  // The Joule browser extension is a way for Bitcoin Lightning users to quickly make payments and authenticate using their Lightning node. By injecting a small script into every page, websites can leverage the WebLN standard to initiate interactions, a standard I developed alongside Joule based on the Ethereum community's Web3 standard.

  // At its peak, Joule had over 1,500 active users, and was featured in many publications and at many conferences. It has also inspired many similar open source projects such as Alby and Jolt. The WebLN standard has been adopted and extended by many applications, such as Sphinx.

  // The project ceased development in 2021 due to Google's significant changes to the web extensions API.

  // ### Technologies used
  // - TypeScript w/ React.js & Redux
  // - Web Extension API
  //     `,
  //   },
  grantio: {
    id: "grantio",
    name: "Grant.io",
    title: "Co-founder",
    website: "https://grant.io",
    dates: "Sep 2018 - Jul 2019",
    color: { primary: "#ffffff", secondary: "#530EEC" },
    screenshots: {
      desktop: grantioDesktopScreenshot,
      mobile: grantioMobileScreenshot,
    },
    description: `
Our goal with Grant.io was to bring accessibility, accountability, and community to the open source funding ecosystem. We came from the open source Ethereum community having experienced a lot of misaligned incentives and "tokenomics" that left a bad taste in our mouth, and felt that grant funding was a more noble way of getting money and building cool stuff.

What started as a smart contract driven platform turned into a white label service. We worked with organizations like the Zcash Foundation and Tlon (urbit) to build a product that allowed them to organize projects that needed funding, and match funders and builders together.

While our work still stands today, the idea of being a consultancy rather than a product company didn't match with our original vision, and we disbanded in 2020.

### Technologies used
- TypeScript w/ React.js
- Python w/ Flask and SQLAlchemy
    `,
  },
  mycrypto: {
    id: "mycrypto",
    name: "MyCrypto",
    title: "Software Engineer",
    website: "https://mycrypto.com",
    dates: "Sep 2017 - Jun 2018",
    color: { primary: "#FFFFFF", secondary: "#163150" },
    screenshots: {
      desktop: mycryptoDesktopScreenshot,
      mobile: mycryptoMobileScreenshot,
    },
    description: `
From open source contributor to member of the team, I helped transition the most popular open source Ethereum wallet MyEtherWallet to its new identity as MyCrypto.

Balancing usability, power user features, and security is a fine line to walk. But in the world of crypto, there's no room for compromise. I was both a designer and implementor of some of the largest features on the wallet, such as the hardware wallet integrations, the payment interface, the new wallet creation flow, and the standalone desktop Electron application.

### Technologies used
- TypeScript w/ React.js
- Electron
    `,
  },
  phase2: {
    id: "phase2",
    name: "Phase2 Technology",
    shortName: "Phase2",
    website: "https://phase2technology.com",
    title: "Software Engineer",
    dates: "Jan 2012 - Jul 2013",
    color: { primary: "#FF7901", secondary: "#FFF4EB" },
    screenshots: {
      desktop: phase2DesktopScreenshot,
      mobile: phase2MobileScreenshot,
    },
    description: `
Primarily focused on the publishing and government sector, Phase2 Technology mainly built PHP CMS websites for our clients. In my time there, I worked directly with clients at organizations such as the PAC-12, Associated Press, Penn State University, and the Whitehouse (Yes, *that* Whitehouse.)

### Technologies used
- PHP w/ Drupal & CodeIgniter
- MySQL
- Jenkins CI
    `,
  },
  "personal-projects": {
    id: "personal-projects",
    name: "Personal Projects",
    website: "https://wbobeirne.com",
    shortName: "My Projects",
    title: "The One and Only",
    dates: "Nov 1993 - ∞",
    color: { primary: "#FFFFFF", secondary: "#EF233C" },
    screenshots: {
      desktop: projectsDesktopScreenshot,
      mobile: projectsMobileScreenshot,
    },
    description: `
Outside of work I like to kick back, relax, and work some more. I love multimedia experiences, and technology is like the missing 6th sense for me. I'm at my best when I'm working across multiple disciplines, mixing design, engineering, and user experience. Here are a few of my projects:

- [BakeBoy Lightning Wallet](https://github.com/wbobeirne/bakeboy) *(2021)*
- [My own wedding website](https://willanddale.com/) *(2020)*
- [RUN LND Lightning Store](https://github.com/wbobeirne/run-lnd-store) *(2018)*
- [Joule](http://lightningjoule.com/) *(2018)*
- [WebLN](https://webln.dev/) *(2018)*
- [eth-balance-checker npm package](https://github.com/wbobeirne/eth-balance-checker) *(2017)*
- [Stranger Things Intro in CSS](https://codepen.io/wbobeirne/pen/pEjqGR) *(2016)*
- [Association to Benefit Children's website](https://web.archive.org/web/20161212175110/https://www.a-b-c.org/) *(2016)*
- [Ludum Dare 22 - Nothing But Stars](https://web.archive.org/web/20120105172220/http://ludumdare.com/compo/ludum-dare-22/?action=preview&uid=5193) *(2011)*
- [Ludum Dare 21 - Jameson Livingston Penguin](https://web.archive.org/web/20120107002350/http://ludumdare.com/compo/2011/09/11/jameson-livingston-penguin-a-post-mortem/) *(2011)*
- [Text Clock Wallpaper for Android](https://www.androidpolice.com/2011/05/20/new-in-the-market-text-clock-pro-indulges-our-literacy-with-a-dynamic-readable-timepiece/) *(2011)*
    `,
  },
};

export const PROJECT_ORDER = Object.keys(PROJECTS) as ProjectKey[];

export const PROJECT_LOGOS: Record<
  ProjectKey,
  ComponentType<SVGProps<SVGElement>>
> = {
  icon: iconLogo,
  fedi: fediLogo,
  servicebell: servicebellLogo,
  // joule: jouleLogo,
  phase2: phase2Logo,
  coder: coderLogo,
  okcupid: okcLogo,
  grantio: grantioLogo,
  mycrypto: mycryptoLogo,
  "personal-projects": projectsLogo,
};
