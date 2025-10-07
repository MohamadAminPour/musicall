"use client";

import { IArtist } from "@/app/admin/artists/page";
import { ISong } from "@/app/admin/songs/page";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPlay, BsPlayFill } from "react-icons/bs";

export default function MusicCard({ ...song }: ISong) {
  const { setSong } = usePlayer();
  const [artists, setArtists] = useState<IArtist[] | null>(null);

  const BASE_API = process.env.NEXT_PUBLIC_API_URL;

  //گرفتن خواننده ها
  async function getArtists() {
    const res = await fetch(`${BASE_API}/api/artists/`);
    const data = await res.json();
    setArtists(data);
  }

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div
      key={song._id}
      className="relative bg-gray-800 rounded-2xl flex flex-col items-center"
    >
      <Link href={`/songs/${song._id}`} className="w-full h-full">
        <img
          src={`${BASE_API}/uploads/images/${song?.image}`}
          className="w-full h-full rounded-2xl object-fill"
        />
      </Link>
      <div className="absolute w-full p-3 bottom-0 flex items-center justify-between bg-linear-to-t from-black to-transparent">
        <div className="flex flex-col">
          <h3 className="font-bold">{song.name}</h3>
          <p className="text-gray-400 text-sm">
            {
              artists?.find((artist: IArtist) => artist._id === song?.artist_id)
                ?.name
            }
          </p>
        </div>
        <button
          onClick={() => setSong(song)}
          className="bg-primary flex justify-center items-center size-[2rem] cursor-pointer text-[.8rem] rounded-full hover:bg-primary"
        >
          <BsPlayFill className="text-[1rem]" />
        </button>
      </div>
    </div>
  );
}
