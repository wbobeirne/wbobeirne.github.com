import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectKey } from "../util/projects";

const initialState = {
  debug: false,
  isViewingProjects: false,
  setIsViewingProjects: (is: boolean) => null,
  activeProject: null as ProjectKey | null,
  setActiveProject: (project: ProjectKey | null) => null,
};

export const AppContext = React.createContext(initialState);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [debug, setDebug] = useState(false);
  const [isViewingProjects, _setIsViewingProjects] = useState(false);
  const [activeProject, _setActiveProject] = useState<ProjectKey | null>(null);

  const setActiveProject = useCallback((project: ProjectKey | null) => {
    _setActiveProject(project);
    return null;
  }, []);

  const setIsViewingProjects = useCallback((is: boolean) => {
    _setIsViewingProjects(is);
    return null;
  }, []);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      console.log({ ev });
      if (ev.code === "Backquote") {
        setDebug((d) => !d);
      }
    };
    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, []);

  const value = useMemo(
    () => ({
      debug,
      isViewingProjects,
      setIsViewingProjects,
      activeProject,
      setActiveProject,
    }),
    [
      debug,
      isViewingProjects,
      setIsViewingProjects,
      activeProject,
      setActiveProject,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return React.useContext(AppContext);
};
