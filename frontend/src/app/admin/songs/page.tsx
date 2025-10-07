"use client";
import { useEffect, useState } from "react";
import { ICategory } from "../categories/page";
import { IAlbum } from "../albums/page";
import { IArtist } from "../artists/page";

export interface ISong {
  _id: string;
  name: string;
  image: string;
  song: string;
  artist_id: string;
  album_id: string;
  category_id: string;
  text: string;
  createdAt: string;
}

export default function AdminSongs() {
  const [songs, setSongs] = useState<ISong[] | null>(null);
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);
  const [artists, setArtists] = useState<IArtist[] | null>(null);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [song, setSong] = useState<File | null>(null);

  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  //گرفتن آهنگ ها
  async function getSongs() {
    try {
      const res = await fetch(`${BASE_API}/api/songs/`);
      const data = await res.json();
      console.log(data);
      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  }

  //گرفتن دستهت بندی ها
  async function getCategories() {
    try {
      const res = await fetch(`${BASE_API}/api/categories/`);
      const data = await res.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  //گرفتن آلبوم ها
  async function getAlbums() {
    try {
      const res = await fetch(`${BASE_API}/api/albums/`);
      const data = await res.json();
      console.log(data);
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  //گرفتن خواننده ها
  async function getArtists() {
    try {
      const res = await fetch(`${BASE_API}/api/artists/`);
      const data = await res.json();
      console.log(data);
      setArtists(data);
    } catch (error) {
      console.log(error);
    }
  }

  //ایجاد موزیک
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !artist || !category || !image || !song) {
      return alert("همه فیلدها لازم هستند!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("song", song);
    formData.append("text", text);
    formData.append("category_id", category);
    formData.append("album_id", album);
    formData.append("artist_id", artist);

    try {
      const res = await fetch(`${BASE_API}/api/songs`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("آهنگ اضافه شد");
        setSongs(songs ? [...songs, data] : [data]);
        setName("");
        setArtist("");
        setAlbum("");
        setCategory("");
        setText("");
        setImage(null);
        setSong(null);
      } else {
        alert(data.message || "خطا در ثبت آهنگ");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور");
    }
  }

  //حذف آهنگ
  async function removeSongHandle(id: string) {
    try {
      await fetch(`${BASE_API}/api/songs/${id}`, {
        method: "DELETE",
      });
      getSongs();
    } catch (error) {
      console.log("خطا در حذف:", error);
    }
  }

  useEffect(() => {
    getSongs();
    getCategories();
    getAlbums();
    getArtists();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت موزیک‌ها</h1>

      {/* فرم ایجاد موزیک */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 **:outline-0 **:mb-2 *:flex *:flex-col gap-2">
          <div>
            <label htmlFor="">عنوان موزیک</label>
            <input
              type="text"
              placeholder="عنوان"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="">نام خواننده</label>
            <select
              name="artist_id"
              value={artist}
              className="p-2 rounded bg-zinc-900"
              onChange={(e) => setArtist(e.target.value)}
            >
              <option value="0">نام خواننده را انتخاب کنید</option>
              {artists?.map((artist) => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">دسته بندی</label>
            <select
              name="category_id_id"
              value={category}
              className="p-2 rounded bg-zinc-900"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="0">دسته بندی را انتخاب کنید</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">نام آلبوم</label>
            <select
              name="album_id"
              value={album}
              className="p-2 rounded bg-zinc-900"
              onChange={(e) => setAlbum(e.target.value)}
            >
              <option value="0">نام آلبوم را انتخاب کنید</option>
              {albums?.map((album) => (
                <option key={album._id} value={album._id}>{album.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">فایل صوتی</label>
            <input
              type="file"
              onChange={(e) => e.target.files && setSong(e.target.files[0])}
              className="p-2 rounded bg-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="">عکس موزیک</label>
            <input
              type="file"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="p-2 rounded bg-zinc-900"
            />
          </div>
        </div>
        <label htmlFor="">متن موزیک</label>

        <textarea
          name=""
          id=""
          onChange={(e) => setText(e.target.value)}
          className="inline w-full bg-zinc-900 p-3 rounded mt-2 outline-0"
          placeholder="متن موزیک را بنویسید..."
        ></textarea>
        <button
          // onClick={addSong}
          type="submit"
          className="bg-primary px-4 py-2 rounded hover:bg-primary/80 cursor-pointer duration-300 my-3"
        >
          اضافه کردن
        </button>
      </form>
      <hr />

      {/* لیست موزیک‌ها */}
      <div className="space-y-3 mt-6 h-[14rem] overflow-y-scroll">
        {songs?.map((s) => (
          <div
            key={s._id}
            className="flex justify-between bg-zinc-800 p-3 rounded"
          >
            <span>
              {s.name} - {artists?.find((artist)=>artist._id===s.artist_id)?.name}
            </span>
            <button
              onClick={() => removeSongHandle(s._id)}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 duration-300 cursor-pointer text-sm"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
