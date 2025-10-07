"use client";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export interface IComment {
  _id: string;
  user_id: string;
  song_id: string;
  text: string;
}

export default function AdminComments() {
  const [comments, setComments] = useState<any[] | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  // 📌 لود کردن همه دیتاها با هم
  async function loadData() {
    try {
      const [usersRes, songsRes, commentsRes] = await Promise.all([
        fetch(`${BASE_API}/api/users`),
        fetch(`${BASE_API}/api/songs`),
        fetch(`${BASE_API}/api/comments`),
      ]);

      const usersData = await usersRes.json();
      const songsData = await songsRes.json();
      const commentsData = await commentsRes.json();

      setUsers(usersData);
      setSongs(songsData);

      const allComments = commentsData.map((comment: IComment) => {
        const user = usersData.find(
          (u:any) => String(u._id) === String(comment.user_id)
        );
        const song = songsData.find(
          (s:any) => String(s._id) === String(comment.song_id)
        );

        return {
          _id: comment._id,
          text: comment.text,
          user: user ? user.username : "کاربر ناشناس",
          song: song ? song.name : "آهنگ ناشناس",
        };
      });

      setComments(allComments);
    } catch (error) {
      console.log("خطا در لود دیتا:", error);
    }
  }

  // 📌 حذف کامنت
  async function removeCommentHandle(id: string) {
    try {
      await fetch(`${BASE_API}/api/comments/${id}`, {
        method: "DELETE",
      });
      loadData(); // دوباره آپدیت می‌کنیم
    } catch (error) {
      console.log("خطا در حذف:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت کامنت‌ها</h1>
      <div className="space-y-3 h-[83vh] overflow-y-scroll">
        {comments?.map((c) => (
          <div
            key={c._id}
            className="flex justify-between bg-zinc-900 p-3 rounded"
          >
            <div className="flex gap-2  flex-col">
              <p className="text-zinc-500 flex gap-2">
                <b className="text-zinc-300">{c.user}</b> برای آهنگ
                <b className="text-zinc-300">{c.song}</b> گفت :
              </p>
              <b className="text-zinc-300 text-justify ">{c.text}</b>
            </div>
            <button
              onClick={() => removeCommentHandle(c._id)}
              className="bg-red-600 cursor-pointer duration-300 px-3 py-1 rounded h-[2rem] mr-5 hover:bg-red-700 text-sm"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
