import MusicCard from "@/components/MusicCard";
import { ISong } from "../admin/songs/page";

export const metadata = {
  title: "موزیکال - موزیک‌های جدید ایرانی",
  description:
    "جدیدترین موزیک‌های ایرانی را در موزیکال گوش دهید، دانلود کنید و با دوستانتان به اشتراک بگذارید.",
  keywords: ["موزیک ایرانی", "آهنگ جدید", "دانلود موزیک", "موزیکال"],
  authors: [{ name: "Muzical Team" }],
  openGraph: {
    title: "موزیکال - موزیک‌های جدید ایرانی",
    description:
      "جدیدترین موزیک‌های ایرانی را در موزیکال گوش دهید و دانلود کنید.",
    url: "https://www.yoursite.com/music",
    siteName: "موزیکال",
    images: [
      {
        url: "https://www.yoursite.com/images/music-og.jpg",
        width: 1200,
        height: 630,
        alt: "موزیکال - موزیک‌های جدید ایرانی",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موزیکال - موزیک‌های جدید ایرانی",
    description: "جدیدترین موزیک‌های ایرانی را گوش دهید و دانلود کنید.",
    images: ["https://www.yoursite.com/images/music-og.jpg"],
    site: "@yourtwitterhandle",
  },
};


export default async function Songs() {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${BASE_API}/api/songs/`);
  const songs = await res.json();

  return (
    <div className="w-[90%] md:w-[80%] mx-auto p-4 text-white min-h-screen pb-30">
      <h1 className="text-3xl font-bold mb-6">همه موزیک‌ها</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {songs.map((song: ISong) => (
          <MusicCard key={song._id} {...song} />
        ))}
      </div>
    </div>
  );
}
