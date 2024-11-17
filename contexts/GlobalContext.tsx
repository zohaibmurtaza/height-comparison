// context to store global states

import { Avatar } from "@/misc/interfaces";
import { useHistoryState } from "@uidotdev/usehooks";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  selectedScreen: string;
  setSelectedScreen: (screen: string) => void;
  selectedAvatar: string | null;
  setSelectedAvatar: (avatar: string | null) => void;
  avatars: Avatar[];
  setAvatars: (avatars: Avatar[]) => void;
  addAvatar: (avatar: Avatar) => void;
  updateAvatar: (avatar: Avatar) => void;
  removeAvatar: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedScreen: "",
  setSelectedScreen: () => {},
  selectedAvatar: null,
  setSelectedAvatar: () => {},
  avatars: [],
  setAvatars: () => {},
  addAvatar: () => {},
  updateAvatar: () => {},
  removeAvatar: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: false,
  canRedo: false,
});

// Provider for the global context
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedScreen, setSelectedScreen] = useState("Add Person");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const {
    state: avatars,
    set: setAvatars,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  } = useHistoryState<Avatar[]>([]);

  console.log("avatars", avatars);

  useEffect(() => {
    const avatars = localStorage.getItem("avatars");
    if (avatars) setAvatars(JSON.parse(avatars));
  }, []);

  useEffect(() => {
    localStorage.setItem("avatars", JSON.stringify(avatars));
  }, [avatars]);

  const addAvatar = (avatar: Avatar) => {
    setAvatars([...avatars, avatar]);
  };

  const removeAvatar = (id: string) => {
    const newAvatars = avatars.filter((a) => a.id !== id);
    setAvatars(newAvatars);
  };

  const updateAvatar = (avatar: Avatar) => {
    const newAvatars = avatars.map((a) => (a.id === avatar.id ? avatar : a));
    setAvatars(newAvatars);
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedScreen,
        setSelectedScreen,
        selectedAvatar,
        setSelectedAvatar,
        avatars,
        setAvatars,
        addAvatar,
        updateAvatar,
        removeAvatar,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
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
