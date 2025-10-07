"use client";
import { useEffect, useState } from "react";

export interface IArtist {
  _id: string;
  name: string;
  bio: string;
  image: string;
}

export default function AdminArtists() {
  const [artists, setArtists] = useState<IArtist[] | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  //get artists
  async function getArtists() {
    try {
      const res = await fetch(`${BASE_API}/api/artists/`);
      const data = await res.json();
      setArtists(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  //load users
  useEffect(() => {
    getArtists();
  }, []);

  //add artist
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !bio || !image) return alert("همه فیلدها لازم است!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("image", image);

    try {
      const res = await fetch(`${BASE_API}/api/artists`, {
        method: "POST",
        body: formData, // حتما FormData باشد
      });

      const data = await res.json();
      if (res.ok) {
        alert("خواننده اضافه شد");
        setArtists(artists ? [...artists, data] : [data]);
        setName("");
        setBio("");
        setImage(null);
      } else {
        alert(data.message || "خطا در ثبت خواننده");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور");
    }
  }

  //remove artist
  async function removeArtistHandle(id: string) {
    try {
      const res = await fetch(`${BASE_API}/api/artists/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      getArtists();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت خواننده‌ها</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label>نام خواننده</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خواننده را بنویسید..."
              className="p-2 rounded mt-1 bg-zinc-900 w-full"
              required
            />
          </div>
          <div>
            <label>عکس خواننده</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="p-2 rounded mt-1 bg-zinc-900 w-full"
              required
            />
          </div>
        </div>

        <label>درباره خواننده</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="inline w-full bg-zinc-900 p-3 rounded mt-1 outline-0"
          placeholder="متنی درباره خواننده بنویسید..."
          required
        ></textarea>

        <button
          type="submit"
          className="bg-primary px-4 py-2 rounded hover:bg-primary/80 cursor-pointer duration-300 my-3"
        >
          اضافه کردن
        </button>
      </form>

      <hr />

      <div className="space-y-3 mt-6 h-[45vh] overflow-y-scroll">
        {artists?.map((s) => (
          <div
            key={s._id}
            className="flex justify-between bg-zinc-800 p-3 rounded"
          >
            <div className="flex items-center gap-3">
              <img
                src={`${BASE_API}/uploads/images/${s.image}`}
                alt=""
                className="w-[3rem] h-[3rem] object-cover rounded"
              />
              <span>{s.name}</span>
            </div>
            <button
              onClick={() => removeArtistHandle(s._id)}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 h-[2rem] duration-300 cursor-pointer text-sm"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
