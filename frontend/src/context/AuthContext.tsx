"use client";
import { IUser } from "@/app/admin/users/page";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  // وقتی صفحه لود شد، توکن رو چک کن و اگر بود اطلاعات کاربر رو fetch کن
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.log("خطا در fetch پروفایل:", err);
        setUser(null);
      }
    }

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
