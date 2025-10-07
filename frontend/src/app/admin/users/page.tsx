"use client";
import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<IUser[] | null>(null);

  //get users
  async function getUsers() {
    try {
      const res = await fetch("http://127.0.0.1:5500/api/users/");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  //load users
  useEffect(() => {
    getUsers();
  }, []);

  //remove user
  async function removeUserHandle(id: string) {
    try {
      const res = await fetch(`http://127.0.0.1:5500/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت کاربران</h1>
      <div className="space-y-3">
        {users?.map((u) => (
          <div
            key={u._id}
            className="flex justify-between bg-zinc-900 p-3 rounded"
          >
            <span>{u.username}</span>
            <button
              onClick={() => removeUserHandle(u._id)}
              className="bg-red-600 cursor-pointer duration-300 px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
