// src/app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import Header from "@/components/Header";
import Player from "@/components/Player";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-zinc-900">
        <AuthProvider>
          <PlayerProvider>
            <Header />
            {children}
            <Player />
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
