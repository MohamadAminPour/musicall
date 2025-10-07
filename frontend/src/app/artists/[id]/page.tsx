import { IArtist } from "@/app/admin/artists/page";
import { ISong } from "@/app/admin/songs/page";
import PlayerButton from "@/components/PlayerButton";
import { FaPlay } from "react-icons/fa";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params }: IParams) {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL
  const { id } = params;

  const res = await fetch(`${BASE_API}/api/artists/${id}`);
  const artist: IArtist = await res.json();

  if (!artist) {
    return {
      title: "خواننده پیدا نشد | موزیکال",
      description: "خواننده مورد نظر پیدا نشد",
    };
  }

  const ogImage = `${BASE_API}/uploads/images/${artist.image}`;

  return {
    title: `موزیکال - آهنگ های ${artist.name}`,
    description: artist.bio.slice(0, 160),
    openGraph: {
      title: `موزیکال - آهنگ های ${artist.name}`,
      description: artist.bio.slice(0, 160),
      type: "profile",
      images: [{ url: ogImage, width: 1200, height: 630, alt: artist.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `موزیکال - آهنگ های ${artist.name}`,
      description: artist.bio.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function ArtistDetails({ params }: IParams) {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL
  const { id } = params;

  const artistsRes = await fetch(`${BASE_API}/api/artists/${id}`);
  const artist = await artistsRes.json();

  const songsRes = await fetch(`${BASE_API}/api/songs`);
  const songs = await songsRes.json();

  if (!artist)
    return <div className="text-center py-10">❌ خواننده پیدا نشد</div>;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto p-6 pb-30">
      {/* اطلاعات خواننده */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={`${BASE_API}/uploads/images/${artist.image}`}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover shadow"
        />
        <div className="text-center md:text-right">
          <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
          <p className="text-gray-600 line-clamp-3">{artist.bio}</p>
        </div>
      </div>

      {/* لیست آهنگ‌ها */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">آهنگ‌ها</h2>
        <div className="space-y-4">
          {songs
            .filter((s: ISong) => s.artist_id === id)
            ?.map((song: ISong) => (
              <div
                key={song._id}
                className="flex items-center justify-between bg-zinc-900 rounded-xl p-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${BASE_API}/uploads/images/${song.image}`}
                    alt={song.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <p className="font-bold">{song.name}</p>
                </div>

                <PlayerButton song={song} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
