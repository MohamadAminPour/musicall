"use client";

import { useEffect, useState } from "react";
import { IComment } from "@/app/admin/comments/page";
import { IUser } from "@/app/admin/users/page";
import { useAuth } from "@/context/AuthContext";

interface CommentsProps {
  songId: string;
  baseApi: any;
}

export default function Comments({ songId, baseApi }: CommentsProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [text, setText] = useState("");
  const { user, setUser, logout } = useAuth();

  // گرفتن کامنت‌ها
  async function getComments() {
    const res = await fetch(`${baseApi}/api/comments`);
    const data = await res.json();
    setComments(data);
  }

  // گرفتن یوزرها
  async function getUsers() {
    const res = await fetch(`${baseApi}/api/users`);
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    getComments();
    getUsers();
  }, []);

  // ارسال کامنت
  async function addCommentHandle(e: React.FormEvent) {
    e.preventDefault();
    if (user === null) {
      alert("برای کامنت گذاشتن اول ثبت نام کن");
      return;
    }
    if (!text.trim()) {
      alert("متنی برای کامنت گذاشتن ننوشتید");
      return;
    }

    try {
      const res = await fetch(`${baseApi}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, user_id: user._id, song_id: songId }),
        // ⚠️ فعلا user_id رو از اولین کاربر تستی گرفتم. بعداً باید لاگین واقعی بذاری.
      });

      const data = await res.json();
      console.log("New Comment:", data);
      alert("کامنت ثبت شد");

      setText("");
      getComments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-3">نظرات کاربران</h2>

      {/* فرم ارسال نظر */}
      <form onSubmit={addCommentHandle} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="flex-1 p-5 outline-0 bg-zinc-900 rounded-lg"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 duration-300 cursor-pointer text-black w-[10rem] py-2 rounded-lg"
        >
          ارسال
        </button>
      </form>

      {/* لیست کامنت‌ها */}
      <div className="space-y-3 *:bg-zinc-900">
        {comments
          ?.filter((c) => c.song_id === songId)
          .map((c) => (
            <div key={c._id} className="p-5 flex items-start gap-1">
              <strong>
                {users?.find((u) => u._id === c.user_id)?.username || "کاربر"}
              </strong>
              <span>:</span>
              <p className="text-justify text-zinc-500">{c.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
