"use client";
import { usePlayer } from "@/context/PlayerContext";

export default function PlayerButton({ song }: any) {
  const { setSong } = usePlayer();

  return (
    <button
      onClick={() => setSong(song)}
      className="bg-primary px-4 cursor-pointer text-[.8rem] md:text-[1rem] duration-300 hover:bg-primary/80 h-[2.5rem] rounded-lg "
    >
      پخش
    </button>
  );
}
