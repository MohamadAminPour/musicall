import Link from "next/link";
import { IAlbum } from "../admin/albums/page";
import { IArtist } from "../admin/artists/page";

export const metadata = {
  title: "موزیکال - آلبوم آهنگ های ایرانی",
  description:
    "جدیدترین آلبوم آهنگ های ایرانی را در موزیکال مشاهده کنید، گوش دهید و دانلود کنید.",
  keywords: ["آلبوم ایرانی", "دانلود آلبوم", "موزیکال", "آلبوم جدید"],
  authors: [{ name: "Muzical Team" }],
  openGraph: {
    title: "موزیکال - آلبوم آهنگ های ایرانی",
    description:
      "جدیدترین آلبوم آهنگ های ایرانی را در موزیکال مشاهده و دانلود کنید.",
    url: "https://www.yoursite.com/albums",
    siteName: "موزیکال",
    images: [
      {
        url: "https://www.yoursite.com/images/albums-og.jpg",
        width: 1200,
        height: 630,
        alt: "موزیکال - آلبوم آهنگ های ایرانی",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موزیکال - آلبوم آهنگ های ایرانی",
    description: "جدیدترین آلبوم آهنگ های ایرانی را مشاهده و دانلود کنید.",
    images: ["https://www.yoursite.com/images/albums-og.jpg"],
    site: "@yourtwitterhandle",
  },
};


export default async function AlbumsPage() {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  // دریافت آلبوم‌ها
  const albumsRes = await fetch(`${BASE_API}/api/albums/`);
  const albums = await albumsRes.json();

  // دریافت خواننده‌ها
  const artistsRes = await fetch(`${BASE_API}/api/artists/`);
  const artists = await artistsRes.json();

  return (
    <div className="w-[90%] md:w-[80%] mx-auto px-4 py-6 pb-30">
      <h1 className="text-3xl font-bold mb-10">آلبوم‌ها</h1>

      {/* لیست آلبوم‌ها */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-5">
        {albums?.map((album:IAlbum) => (
          <div className="relative transition text-center" key={album._id}>
            <div className="absolute w-[100%] flex items-center flex-col -z-10 -top-5">
              <div className="w-[80%] h-[.5rem] bg-zinc-700/50 rounded-t-2xl mb-[2px]"></div>
              <div className="w-[90%] h-[.5rem] bg-zinc-700 rounded-t-2xl"></div>
            </div>
            <Link key={album._id} href={`/albums/${album._id}`}>
              <img
                src={`${BASE_API}/uploads/images/${album.image}`}
                alt={album.name}
                className="object-cover rounded-2xl"
              />
            </Link>
            <div className="w-full p-3 absolute bottom-0 flex items-end justify-between flex-col sm:flex-row gap-3 bg-linear-to-t from-black to-transparent">
              <div className="text-right">
                <h3 className="text-lg font-bold">{album.name}</h3>
                <p className="text-sm text-gray-500">
                  {artists.find((a:IArtist)=>a._id==album.artist_id)?.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
