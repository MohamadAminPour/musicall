"use client";
import { IArtist } from "@/app/admin/artists/page";
import { usePlayer } from "@/context/PlayerContext";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function Player() {
  const { currentSong, playing, togglePlay } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [artists, setArtists] = useState<IArtist[] | null>(null);
    const path = usePathname();
  

  const [progress, setProgress] = useState(0);
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  //گرفتن خواننده ها
  async function getArtists() {
    const res = await fetch(`${BASE_API}/api/artists/`);
    const data = await res.json();
    setArtists(data);
  }

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing, currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  };

  if (!currentSong || !artists) return;

  return (
    <div className={`${ path.includes("admin") ? "hidden" : "flex"} fixed bottom-0 duration-500 left-0 w-full bg-zinc-900 p-4 flex items-center gap-4 shadow-lg`}>
      <img
        src={`${BASE_API}/uploads/images/${currentSong?.image}`}
        alt={currentSong?.name}
        className="w-16 h-16 rounded"
      />
      <div className="flex-1">
        <h3 className="font-bold">{currentSong?.name}</h3>
        <p className="text-gray-400 text-sm">
          {
            artists?.find(
              (artist: IArtist) => artist._id === currentSong?.artist_id
            )?.name
          }
        </p>
        <div className="w-full h-1 bg-gray-700 rounded mt-1">
          <div
            className="h-1 bg-primary rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <button
        onClick={togglePlay}
        className="bg-primary absolute left-[1.2rem] -top-[5%] text-black size-[2rem] flex items-center justify-center cursor-pointer mt-[2rem] rounded-full hover:bg-primary"
      >
        {playing ? (
          <p className="font-black">| |</p>
        ) : (
          <FaPlay className="text-[.8rem]" />
        )}
      </button>
      <audio
        ref={audioRef}
        // src={currentSong.url}
        src={`${BASE_API}/uploads/audio/${currentSong?.song}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlay()}
      />
    </div>
  );
}
