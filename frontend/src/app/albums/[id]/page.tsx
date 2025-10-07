// "use client";
import { IAlbum } from "@/app/admin/albums/page";
import { IArtist } from "@/app/admin/artists/page";
import { ISong } from "@/app/admin/songs/page";
import PlayerButton from "@/components/PlayerButton";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params }: IParams) {
    const BASE_API = process.env.NEXT_PUBLIC_API_URL
  const { id } = params;

  const albumRes = await fetch(`${BASE_API}/api/albums/${id}`);
  const album: IAlbum = await albumRes.json();

  //دریافت خواننده ها
  const artistsRes = await fetch(`${BASE_API}/api/artists`);
  const artists = await artistsRes.json();

  if (!album) {
    return {
      title: "آلبوم پیدا نشد | موزیکال",
      description: "آلبوم مورد نظر پیدا نشد",
    };
  }

  const ogImage = `${BASE_API}/uploads/images/${album.image}`;

  return {
    title: `موزیکال - آلبوم ${album.name}`,
    description: `آلبوم ${album.name} از خواننده ${
      artists.find((artist: IArtist) => artist._id === album.artist_id)?.name
    } را گوش دهید.`,
    openGraph: {
      title: `موزیکال - آلبوم ${album.name}`,
      description: `آلبوم ${album.name} از خواننده ${
        artists.find((artist: IArtist) => artist._id === album.artist_id)?.name
      } را گوش دهید.`,
      type: "music.album",
      images: [{ url: ogImage, width: 1200, height: 630, alt: album.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `موزیکال - آلبوم ${album.name}`,
      description: `آلبوم ${album.name} از خواننده ${
        artists.find((artist: IArtist) => artist._id === album.artist_id)?.name
      } را گوش دهید.`,
      images: [ogImage],
    },
  };
}

export default async function AlbumDetails({ params }: IParams) {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL
  const { id } = params;

  // دریافت آلبوم‌
  const albumsRes = await fetch(`${BASE_API}/api/albums/${id}`);
  const album = (await albumsRes.json()) as IAlbum;

  //دریافت خواننده ها
  const res = await fetch(`${BASE_API}/api/artists`);
  const artists = await res.json();

  //دریافت موزیک ها
  const songsRes = await fetch(`${BASE_API}/api/songs`);
  const songs = await songsRes.json();

  if (!album) {
    return <div className="text-center py-10">❌ آلبوم پیدا نشد</div>;
  }

  return (
    <div className="w-[90%] md:w-[80%] mx-auto pb-30 p-6">
      {/* اطلاعات آلبوم */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={`${BASE_API}/uploads/images/${album?.image}`}
          alt={album?.name}
          className="md:w-40 sm:h-40 rounded-lg object-cover shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{album?.name}</h1>
          <p className="text-gray-600">
            {
              artists.find((artist: IArtist) => artist._id === album.artist_id)
                ?.name
            }
          </p>
          {/* <p className="text-sm text-gray-400">سال انتشار: {album?.year}</p> */}
        </div>
      </div>

      {/* لیست آهنگ‌ها */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">آهنگ‌های آلبوم</h2>
        <div className="space-y-4">
          {songs
            .filter((song: ISong) => song.album_id === album._id)
            .map((song: ISong) => (
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
