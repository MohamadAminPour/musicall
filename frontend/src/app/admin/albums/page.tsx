"use client";
import { useEffect, useState } from "react";
import {  IArtist } from "../artists/page";
import Loader from "@/components/Loader";

export interface IAlbum {
  _id: string;
  name: string;
  artist_id: string;
  image: string;
}

export default function AdminAlbums() {
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);
  const [artists, setArtists] = useState<IArtist[] | null>(null);
  const [name, setName] = useState("");
  const [artist_id, setArtist_id] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const BASE_API = process.env.NEXT_PUBLIC_API_URL
  // دریافت آلبوم‌ها
  async function getAlbums() {
    try {
      const res = await fetch(`${BASE_API}/api/albums/`);
      const data = await res.json();
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  // دریافت خواننده‌ها
  async function getArtists() {
    try {
      const res = await fetch(`${BASE_API}/api/artists/`);
      const data = await res.json();
      setArtists(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAlbums();
    getArtists();
  }, []);

  // ایجاد آلبوم
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !artist_id || !image)
      return alert("تمام فیلدها باید پر شوند!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("artist_id", artist_id);
    formData.append("image", image);

    try {
      const res = await fetch(`${BASE_API}/api/albums`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("آلبوم اضافه شد");
        setAlbums(albums ? [...albums, data] : [data]);
        setName("");
        setArtist_id("");
        setImage(null);
      } else {
        alert(data.message || "خطا در ثبت آلبوم");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور");
    }
  }

  //حذف آلبوم
  async function removeArtistHandle(id: string) {
    try {
      const res = await fetch(`${BASE_API}/api/albums/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      getAlbums();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت آلبوم‌ها</h1>

      {/* فرم ایجاد آلبوم */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label>نام آلبوم</label>
            <input
              type="text"
              placeholder="نام آلبوم را وارد کنید..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-zinc-900 w-full"
            />
          </div>

          <div>
            <label>عکس آلبوم</label>
            <input
              type="file"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="p-2 rounded bg-zinc-900 w-full"
            />
          </div>

          <div>
            <label>خواننده</label>
            <select
              value={artist_id}
              onChange={(e) => setArtist_id(e.target.value)}
              className="p-2 rounded bg-zinc-900 w-full"
            >
              <option value="">انتخاب خواننده</option>
              {artists?.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-4 py-2 rounded hover:bg-primary/80 cursor-pointer duration-300"
        >
          اضافه کردن
        </button>
      </form>

      <hr className="my-4" />

      {/* لیست آلبوم‌ها */}
      <div className="space-y-3 mt-5 h-[61vh] overflow-y-scroll">
        {albums?.map((a) => (
          <div
            key={a._id}
            className="flex justify-between bg-zinc-800 p-3 rounded items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={`${BASE_API}/uploads/images/${a.image}`}
                alt={a.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>
                {a.name} -{" "}
                {artists?.find((artist) => artist._id == a.artist_id)?.name}
              </span>
            </div>
            <button
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm cursor-pointer"
              onClick={() => removeArtistHandle(a._id)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
