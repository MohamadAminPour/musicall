import Link from "next/link";

export const metadata = {
  title: "موزیکال - هنرمندان ایرانی",
  description:
    "جدیدترین هنرمندان و خوانندگان ایرانی را در موزیکال دنبال کنید و آثارشان را گوش دهید.",
  keywords: ["خواننده ایرانی", "هنرمند ایرانی", "موزیکال", "آهنگ ایرانی"],
  authors: [{ name: "Muzical Team" }],
  openGraph: {
    title: "موزیکال - هنرمندان ایرانی",
    description:
      "جدیدترین هنرمندان ایرانی را دنبال کنید و آثارشان را در موزیکال گوش دهید.",
    url: "https://www.yoursite.com/artists",
    siteName: "موزیکال",
    images: [
      {
        url: "https://www.yoursite.com/images/artists-og.jpg",
        width: 1200,
        height: 630,
        alt: "موزیکال - هنرمندان ایرانی",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موزیکال - هنرمندان ایرانی",
    description: "جدیدترین هنرمندان ایرانی را دنبال کنید و آثارشان را گوش دهید.",
    images: ["https://www.yoursite.com/images/artists-og.jpg"],
    site: "@yourtwitterhandle",
  },
};


export default async function ArtistsPage() {
  const BASE_API = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${BASE_API}/api/artists/`);
  const data = await res.json();

  return (
    <div className="w-[90%] md:w-[80%] mx-auto px-4 py-6 pb-30">
      <h1 className="text-3xl font-bold mb-6">خواننده‌ها</h1>

      {/* لیست خواننده‌ها */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {data.map((artist:any) => (
          <div
            className="bg-zinc-900 rounded-3xl shadow hover:shadow-lg transition p-3 pb-4 text-center"
            key={artist._id}
          >
            <Link key={artist._id} href={`/artists/${artist._id}`}>
              <img
                src={`${BASE_API}/uploads/images/${artist.image}`}
                alt={artist.name}
                className="rounded-2xl md:rounded-2xl h-[10rem] sm:h-[20rem] w-full object-cover mb-4"
              />
            </Link>
            <div className="w-full flex items-start sm:items-end justify-between flex-col gap-3 px-1">
              <div className="text-right">
                <h3 className="text-lg font-bold">{artist.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">{artist.bio}</p>
              </div>
              <div className="w-full">
                <button className="bg-primary w-full text-black cursor-pointer duration-300 hover:bg-primary/80 px-4 py-[6px] text-[.9rem] rounded-full">
                  دنبال کردن +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
