// context to store global states

import { createContext, useContext, useState } from "react";

interface GlobalContextType {
  selectedScreen: string;
  setSelectedScreen: (screen: string) => void;
  avatars: Avatar[];
  setAvatars: (avatars: Avatar[]) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedScreen: "",
  setSelectedScreen: () => {},
  avatars: [],
  setAvatars: () => {},
});

// Provider for the global context
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedScreen, setSelectedScreen] = useState("Add Person");
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  return (
    <GlobalContext.Provider
      value={{ selectedScreen, setSelectedScreen, avatars, setAvatars }}
    >
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
