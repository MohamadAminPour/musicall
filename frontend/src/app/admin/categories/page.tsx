"use client";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export interface ICategory {
  _id: string;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<any[] | null>(null);
  const [name, setName] = useState("");
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  // گرفتن دسته بندی ها
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

  //ایجاد دسته بندی
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) return alert("همه فیلدها لازم است!");

    try {
      const res = await fetch(`${BASE_API}/api/categories`, {
        method: "POST",
         headers: {
        "Content-Type": "application/json",  
      },
        body: JSON.stringify({ name: name }), 
      });

      const data = await res.json();
      if (res.ok) {
        alert("دسته بندی اضافه شد");
        setName("");
        getCategories()
      } else {
        alert(data.message || "خطا در ثبت دسته بندی");
      }
    } catch (err) {
      console.error(err);
      alert("خطای سرور");
    }
  }

  // 📌 حذف دسته بندی
  async function removeCategoryHandle(id: string) {
    try {
      await fetch(`${BASE_API}/api/categories/${id}`, {
        method: "DELETE",
      });
      getCategories(); // دوباره آپدیت می‌کنیم
    } catch (error) {
      console.log("خطا در حذف:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت دسته بندی ها</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label>نام دسته بندی</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام دسته بندی را بنویسید..."
            className="p-2 rounded mt-1 bg-zinc-900 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-4 py-2 rounded hover:bg-primary/80 cursor-pointer duration-300 my-3"
        >
          اضافه کردن
        </button>
      </form>

      <hr />

      <div className="space-y-3 mt-5 h-[60vh] overflow-y-scroll">
        {categories?.map((c: ICategory) => (
          <div
            key={c._id}
            className="flex justify-between bg-zinc-900 p-3 rounded"
          >
            <p>{c.name}</p>
            <button
              onClick={() => removeCategoryHandle(c._id)}
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
