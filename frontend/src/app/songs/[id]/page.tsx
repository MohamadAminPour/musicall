import { BiDownload } from "react-icons/bi";
import { ISong } from "@/app/admin/songs/page";
import { IArtist } from "@/app/admin/artists/page";
import PlayerButton from "@/components/PlayerButton";
import Comments from "@/components/Comments";
import SongText from "@/components/SongText";
import Link from "next/link";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params }: IParams) {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL;
  const { id } = params;

  const songsRes = await fetch(`${BASE_API}/api/songs/${id}`);
  const song: ISong = await songsRes.json();

  const artistsRes = await fetch(`${BASE_API}/api/artists`);
  const artists = await artistsRes.json();

  if (!song) {
    return {
      title: "آهنگ پیدا نشد | موزیکال",
      description: "آهنگ مورد نظر پیدا نشد",
    };
  }

  const ogImage = `${BASE_API}/uploads/images/${song.image}`;

  return {
    title: `موزیکال - آهنگ ${song.name} ${
      artists?.find((artist: IArtist) => artist._id === song.artist_id)?.name
    }`,
    description: song.text.slice(0, 160),
    openGraph: {
      title: `موزیکال - ${song.name} ${
        artists?.find((artist: IArtist) => artist._id === song.artist_id)?.name
      }`,
      description: song.text.slice(0, 160),
      type: "music.song",
      images: [{ url: ogImage, width: 1200, height: 630, alt: song.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `موزیکال - ${song.name} ${
        artists?.find((artist: IArtist) => artist._id === song.artist_id)?.name
      }`,
      description: song.text.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function SongDetails({ params }: IParams) {
  const { id } = params;
  const BASE_API = process.env.NEXT_PUBLIC_API_URL;

  // گرفتن آهنگ
  const songsRes = await fetch(`${BASE_API}/api/songs/${id}`);
  const song = (await songsRes.json()) as ISong;

  // گرفتن خواننده‌ها
  const artistsRes = await fetch(`${BASE_API}/api/artists/`);
  const artists = (await artistsRes.json()) as IArtist[];

  // تاریخ میلادی به شمسی
  const date = new Date(song.createdAt);
  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  if (!song) {
    return <div className="text-center py-10">❌ آهنگ پیدا نشد</div>;
  }

  return (
    <div className="w-[90%] md:w-[80%] mx-auto px-4 py-6 pb-30">
      {/* 🎵 کاور و اطلاعات */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={`${BASE_API}/uploads/images/${song.image}`}
          alt={song.name}
          className="w-[20rem] h-[20rem] sm:w-[13rem] sm:h-[13rem] object-cover rounded-lg shadow"
        />
        <div className="w-full flex flex-col md:items-start items-center">
          <h1 className="text-3xl font-bold mb-2">{song.name}</h1>
          <p className="text-gray-600 mb-2">
            خواننده :{" "}
            {artists.find((a) => a._id === song.artist_id)?.name || "ناشناس"}
          </p>
          <p className="text-sm text-gray-400">تاریخ انتشار : {persianDate}</p>

          <div className="flex items-center gap-1 mt-3">
            <PlayerButton song={song} /> {/* Client Component */}
            <Link
              href={`${BASE_API}/uploads/audio/${song.song}`}
              download={true}
              className="flex items-center justify-center bg-zinc-100 hover:bg-zinc-400 duration-300 cursor-pointer text-black size-[2.5rem] rounded-lg"
            >
              <BiDownload />
            </Link>
          </div>
        </div>
      </div>

      {/* 📜 متن آهنگ */}
      <SongText txt={song.text} />

      {/* 💬 بخش کامنت‌ها */}
      <Comments songId={id} baseApi={BASE_API} />
    </div>
  );
}
