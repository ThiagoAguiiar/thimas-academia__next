"use client";

import React from "react";

interface IContext {
  slideOvers: Record<string, boolean>;
  setSlideOver: (id: string, value: boolean) => void;
}

type Children = {
  children: React.ReactNode;
};

const SlideOverContext = React.createContext<IContext | null>(null);

export const SlideOverProvider = ({ children }: Children) => {
  const [slideOvers, setSlideOvers] = React.useState<Record<string, boolean>>(
    {}
  );

  const setSlideOver = (id: string, value: boolean) => {
    setSlideOvers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const getSlideOver = (id: string) => slideOvers[id] ?? false;

  return (
    <SlideOverContext.Provider value={{ slideOvers, setSlideOver }}>
      {children}
    </SlideOverContext.Provider>
  );
};

export const useSlideOverContext = () => {
  const context = React.useContext(SlideOverContext);

  if (!context) {
    throw new Error(
      "useSlideOverContext must be used within a SlideOverProvider"
    );
  }

  return context;
};
