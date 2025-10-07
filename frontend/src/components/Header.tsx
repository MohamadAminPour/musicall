"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

const links = [
  { id: 1, title: "صفحه اصلی", link: "/" },
  { id: 2, title: "موزیک‌ها", link: "/songs" },
  { id: 3, title: "خواننده‌ها", link: "/artists" },
  { id: 5, title: "آلبوم‌ها", link: "/albums" },
];

export default function Header() {
  const { user, setUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  return (
    <header
      className={`bg-zinc-900 px-6 py-4 flex items-center justify-between z-50 ${
        path.includes("admin") ? "hidden" : "flex"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold text-primary">
        موزیکال
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-gray-300">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.link}
            className={`hover:text-primary duration-300 ${
              link.link === path && "text-primary"
            } `}
          >
            {link.title}
          </Link>
        ))}
      </nav>

      {/* Auth & Mobile Menu */}
      <div className="flex items-center gap-4 z-50">
        {user ? (
          <>
            <span className="hidden md:inline text-gray-200 font-semibold">
              {user.username}
            </span>
            {user?.role === "admin" ? (
              <Link
                href="/admin"
                className="bg-primary duration-300 px-3 py-1 rounded-lg cursor-pointer hover:bg-primary/80 text-sm"
              >
                پنل ادمین
              </Link>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded-lg cursor-pointer hover:bg-red-700 text-sm"
              >
                خروج
              </button>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary text-sm"
          >
            ورود / ثبت‌نام
          </Link>
        )}

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className=" z-50 absolute top-16 left-0 w-full bg-zinc-900 flex flex-col gap-4 p-4 md:hidden *:duration-300 *:hover:text-primary">
          <Link href="/songs" className="hover:text-white">
            موزیک‌ها
          </Link>
          <Link href="/artists" className="hover:text-white">
            خواننده‌ها
          </Link>
          <Link href="/albums" className="hover:text-white">
            آلبوم‌ها
          </Link>
        </nav>
      )}
    </header>
  );
}
