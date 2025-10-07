"use client";
import { ISong } from "@/app/admin/songs/page";
import { createContext, useContext, useState, useEffect } from "react";



interface PlayerContextType {
  currentSong: ISong | null;
  setSong: (song: ISong) => void;
  playing: boolean;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const [playing, setPlaying] = useState(false);

  const setSong = (song: ISong) => {
    setCurrentSong(song);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying(!playing);

  return (
    <PlayerContext.Provider value={{ currentSong, setSong, playing, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};
