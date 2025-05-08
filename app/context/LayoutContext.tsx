"use client";

import React, { createContext, useContext, useState } from 'react';
import LayoutProvider from '../providers/LayoutProvider';

type ConfigType = {
  [key: string]: unknown;
};

type LayoutContextType = {
  config: ConfigType;
  updateConfig: (newConfig: ConfigType) => void;
};

export  const LayoutContext = createContext<LayoutContextType>({
  config: {},
  updateConfig: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export function Layout({
  initialConfig, 
  children 
}: { 
  initialConfig: ConfigType; 
  children: React.ReactNode 
}) {
  const [config, setConfig] = useState<ConfigType>(initialConfig);

  const updateConfig = (newConfig: ConfigType) => {
    setConfig(newConfig);
  };

  return (
    <LayoutContext.Provider value={{ config, updateConfig }}>
      <LayoutProvider config={config ?? initialConfig}>
        {children}
      </LayoutProvider>
    </LayoutContext.Provider>
  );
}