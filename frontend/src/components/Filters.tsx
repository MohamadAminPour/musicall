"use client";
import React, {useEffect, useState, useMemo } from "react";
import { ISong } from "@/app/admin/songs/page";

const MusicCard = React.lazy(() => import("./MusicCard"));

export default function Filters() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<ISong[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "newest" | "popular" | "most" | "oldest"
  >("newest");

  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  async function getSongs() {
    try {
      const res = await fetch(`${BASE_API}/api/songs/`);
      const data = await res.json();
      setSongs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    let result = songs?.filter((s: ISong) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (filter) {
      case "newest":
        result?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result?.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "most":
        result?.sort((a: any, b: any) => b.views - a.views);
        break;
      case "popular":
        result?.sort((a: any, b: any) => b.likes - a.likes);
        break;
    }

    return result;
  }, [search, filter, songs]);

  return (
    <div>
      {/* سرچ و فیلتر */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">موزیکال</h1>
        <input
          type="text"
          placeholder="جستجوی موزیک یا خواننده..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl outline-0 bg-zinc-900 mb-4 text-white"
        />
        <div className="flex gap-2 flex-wrap">
          {["newest", "oldest", "popular", "most"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-[.8rem] cursor-pointer ${
                filter === f ? "bg-primary text-black" : "bg-zinc-700"
              }`}
            >
              {f === "newest"
                ? "جدیدترین"
                : f === "oldest"
                ? "قدیمی‌ترین"
                : f === "popular"
                ? "محبوب‌ترین"
                : "پر بازدید"}
            </button>
          ))}
        </div>
      </div>

      {/* لیست موزیک‌ها */}
      {loading ? (
        <p className="text-gray-400">در حال بارگذاری...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-20">
          {filteredSongs?.map((song) => (
            <MusicCard key={song._id} {...song} />
          ))}
        </div>
      )}
    </div>
  );
}
