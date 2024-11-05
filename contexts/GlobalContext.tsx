// context to store global states

import { createContext, useContext, useState } from "react";

interface GlobalContextType {
  selectedScreen: string;
  setSelectedScreen: (screen: string) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedScreen: "",
  setSelectedScreen: () => {},
});

// Provider for the global context
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedScreen, setSelectedScreen] = useState("Add Person");

  return (
    <GlobalContext.Provider value={{ selectedScreen, setSelectedScreen }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook to use the global context
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobals must be used within a GlobalContextProvider");
  }
  return context;
};
