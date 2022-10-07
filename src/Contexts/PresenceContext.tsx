import IPresence from "@BetterStatus/Interfaces/Presence";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type PresenceContextType = {
  presences: IPresence[];
  createPresence: (
    id: string,
    appId: string,
    name: string,
    imageURL: string,
    details: string,
    state: string,
    largeImageKey: string,
    largeImageText: string,
    smallImageKey: string,
    smallImageText: string,
    timestamp: boolean
  ) => void;
  updatePresence: (
    id: string,
    appId: string,
    name: string,
    imageURL: string,
    details: string,
    state: string,
    largeImageKey: string,
    largeImageText: string,
    smallImageKey: string,
    smallImageText: string,
    timestamp: boolean
  ) => void;
  deletePresence: (name: string) => void;
};

const PresenceContext = createContext({});

export const PresencesProvider = ({ children }: { children: ReactNode }) => {
  const [presences, setPresences] = useState<IPresence[]>([]);

  useEffect(() => {
    setPresences(JSON.parse(localStorage.getItem("presences")) || []);
  }, []);

  const createPresence = (
    id: string,
    appId: string,
    name: string,
    imageURL: string,
    details: string,
    state: string,
    largeImageKey: string,
    largeImageText: string,
    smallImageKey: string,
    smallImageText: string,
    timestamp: boolean
  ) => {
    const newPresences = [
      ...presences,
      {
        id,
        appId,
        name,
        imageURL,
        details,
        state,
        largeImageKey,
        largeImageText,
        smallImageKey,
        smallImageText,
        timestamp,
      },
    ];

    setPresences(newPresences);

    console.log("Presences Changed, New: ", newPresences);

    localStorage.setItem("presences", JSON.stringify(newPresences));
  };

  const updatePresence = (
    id: string,
    appId: string,
    name: string,
    imageURL: string,
    details: string,
    state: string,
    largeImageKey: string,
    largeImageText: string,
    smallImageKey: string,
    smallImageText: string,
    timestamp: boolean
  ) => {
    const newPresences = presences.map((presence) =>
      presence.id === id
        ? {
            ...presence,
            ...{
              appId,
              name,
              imageURL,
              details,
              state,
              largeImageKey,
              largeImageText,
              smallImageKey,
              smallImageText,
              timestamp,
            },
          }
        : presence
    );

    // {
    //   id,
    //   name,
    //   imageURL,
    //   details,
    //   state,
    //   largeImageKey,
    //   largeImageText,
    //   smallImageKey,
    //   smallImageText,
    //   timestamp,
    // }

    console.log("Presences Changed, New: ", newPresences);

    localStorage.setItem("presences", JSON.stringify(newPresences));
  };

  const deletePresence = (name: string) => {
    const deletedPresence = presences.filter(
      (presence) => presence.name !== name
    );

    setPresences(deletedPresence);

    localStorage.setItem("presences", JSON.stringify(deletedPresence));
  };

  return (
    <PresenceContext.Provider
      value={{
        presences,
        createPresence,
        updatePresence,
        deletePresence,
      }}
    >
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = (): PresenceContextType => {
  return useContext(PresenceContext) as PresenceContextType;
};
