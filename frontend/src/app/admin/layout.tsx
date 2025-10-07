// src/app/admin/layout.tsx
"use client";
import Sidebr from "@/components/Sidebr";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 700) {
      setSidebar(false);
    }
  }, []);
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
     <Sidebr sidebar={sidebar} setSidebar={setSidebar} />

      {/* Main Content */}

      <main className="flex-1 p-6">
        <BiMenu
          className="text-[1.5rem] cursor-pointer hover:text-primary duration-300"
          onClick={() => setSidebar(!sidebar)}
        />
        {children}
      </main>
    </div>
  );
}
