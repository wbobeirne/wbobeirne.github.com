import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectKey } from "../util/projects";

const initialState = {
  debug: false,
  isViewingProjects: false,
  setIsViewingProjects: (is: boolean) => null,
  activeProject: null as ProjectKey | null,
  setActiveProject: (project: ProjectKey | null) => null,
  isUiHidden: false,
  toggleUi: () => null,
  stickyNavTop: 0,
  setStickyNavTop: (top: number) => null,
};

export const AppContext = React.createContext(initialState);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [debug, setDebug] = useState(false);
  const [isViewingProjects, _setIsViewingProjects] = useState(false);
  const [activeProject, _setActiveProject] = useState<ProjectKey | null>(null);
  const [isUiHidden, setIsUiHidden] = useState(false);
  const [stickyNavTop, _setStickyNavTop] = useState(0);

  const setActiveProject = useCallback((project: ProjectKey | null) => {
    _setActiveProject(project);
    return null;
  }, []);

  const setIsViewingProjects = useCallback((is: boolean) => {
    _setIsViewingProjects(is);
    return null;
  }, []);

  const toggleUi = useCallback(() => {
    setIsUiHidden((is) => !is);
    return null;
  }, []);

  const setStickyNavTop = useCallback((top: number) => {
    _setStickyNavTop(top);
    return null;
  }, []);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey) return;
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
      isUiHidden,
      toggleUi,
      stickyNavTop,
      setStickyNavTop,
    }),
    [
      debug,
      isViewingProjects,
      setIsViewingProjects,
      activeProject,
      setActiveProject,
      isUiHidden,
      toggleUi,
      stickyNavTop,
      setStickyNavTop,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return React.useContext(AppContext);
};
