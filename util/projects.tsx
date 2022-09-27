import React from "react";

export interface ProjectInfo {
  name: string;
  shortName?: string;
  title: string;
  dates: string;
  logo: string;
  color: { primary: string; secondary: string };
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
    dates: "Feb 2021 - Sep 2022",
    logo: "/logos/servicebell.svg",
    color: { primary: "#e77709", secondary: "#f9f5ec" },
    description: <></>,
  },
  joule: {
    name: "Joule",
    title: "Creator",
    dates: "August 2018",
    logo: "/logos/joule.svg",
    color: { primary: "#7642FF", secondary: "#E9E1FF" },
    description: <></>,
  },
  phase2: {
    name: "Phase2 Technology",
    shortName: "Phase2",
    title: "Software Engineer",
    dates: "Jan 2012 - Jul 2013",
    logo: "/logos/phase2.svg",
    color: { primary: "#FF7901", secondary: "#FFF4EB" },
    description: <></>,
  },
  coder: {
    name: "Coder",
    title: "Engineering Manager / Staff Software Engineer",
    dates: "Sep 2019 - Dec 2020",
    logo: "/logos/coder.svg",
    color: { primary: "#FFFFFF", secondary: "#2773df" },
    description: <></>,
  },
  okcupid: {
    name: "OkCupid",
    title: "Senior Software Engineer",
    dates: "Aug 2013 - Deb 2017",
    logo: "/logos/okcupid.svg",
    color: { primary: "#ffffff", secondary: "#5da3ff" },
    description: <></>,
  },
  grantio: {
    name: "Grant.io",
    title: "Co-founder",
    dates: "Sep 2018 - Jul 2019",
    logo: "/logos/grantio.svg",
    color: { primary: "#ffffff", secondary: "#530EEC" },
    description: <></>,
  },
  mycrypto: {
    name: "MyCrypto",
    title: "Software Engineer",
    dates: "Sep 2017 - Jun 2018",
    logo: "/logos/mycrypto.svg",
    color: { primary: "#FFFFFF", secondary: "#163150" },
    description: <></>,
  },
  "personal-projects": {
    name: "Personal Projects",
    shortName: "My Projects",
    title: "The Dude",
    dates: "Nov 1993 - ∞",
    logo: "/logos/projects.svg",
    color: { primary: "#FFFFFF", secondary: "#EF233C" },
    description: <></>,
  },
};

export const PROJECT_ORDER = Object.keys(PROJECTS) as ProjectKey[];
