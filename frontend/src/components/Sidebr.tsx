"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiX } from "react-icons/bi";

const links = [
  { id: 1, name: "داشبورد", src: "/admin" },
  { id: 2, name: "موزیک ها", src: "/admin/songs" },
  { id: 3, name: "خواننده ها", src: "/admin/artists" },
  { id: 4, name: "آلبوم ها", src: "/admin/albums" },
  { id: 5, name: "کاربران", src: "/admin/users" },
  { id: 6, name: "کامنت ها", src: "/admin/comments" },
  { id: 7, name: "دسته بندی ها", src: "/admin/categories" },
];

export default function Sidebr({ sidebar, setSidebar }: any) {
  const { user, setUser, logout } = useAuth();
  const path = usePathname();

  return (
    <aside
      className={`${
        sidebar ? "w-64" : "w-0 hidden"
      } z-50 bg-zinc-900 p-6 duration-300 flex flex-col gap-4 *:duration-300 absolute md:static h-screen`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">پنل ادمین</h2>
        <BiX
          className="text-[1.5rem] cursor-pointer hover:text-primary duration-300"
          onClick={() => setSidebar(!sidebar)}
        />
      </div>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.src}
          className={`${
            link.src === path
              ? "bg-primary py-1 px-3 rounded-md"
              : "hover:text-primary"
          } `}
        >
          {link.name}
        </Link>
      ))}
      <button
        onClick={logout}
        className="bg-red-600 px-3 py-1 rounded-lg cursor-pointer hover:bg-red-700 text-sm"
      >
        خروج
      </button>
    </aside>
  );
}
