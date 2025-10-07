import Filters from "@/components/Filters";
import { Metadata } from "next";
import Head from "next/head";

export const metadata = {
  title: "موزیکال - سایت موسیقی فارسی",
  description: "جدیدترین آهنگ‌ها، آلبوم‌ها و هنرمندان ایرانی را گوش دهید و دانلود کنید.",
  keywords: "موسیقی, آهنگ, آلبوم, خواننده, دانلود موزیک, موزیک فارسی",
  openGraph: {
    title: "موزیکال - سایت موسیقی فارسی",
    description: "جدیدترین آهنگ‌ها، آلبوم‌ها و هنرمندان ایرانی را گوش دهید و دانلود کنید.",
    url: "https://www.yoursite.com",
    siteName: "موزیکال",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://www.yoursite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "موزیکال",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "موزیکال - سایت موسیقی فارسی",
    description: "جدیدترین آهنگ‌ها، آلبوم‌ها و هنرمندان ایرانی را گوش دهید و دانلود کنید.",
    images: ["https://www.yoursite.com/images/og-image.jpg"],
    site: "@YourTwitterHandle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function HomePage() {
  return (
    <div className="min-h-screen p-6 md:p-12 bg-zinc-950 text-white">
      <Filters />
    </div>
  );
}
