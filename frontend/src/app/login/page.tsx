"use client";
import loginAction from "@/actions/loginAction";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function AuthPage() {
  const [state, formAction] = useActionState(loginAction, {
    message: "",
    isSuccess: false,
    data: null,
  });
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    if (state?.isSuccess) {
      alert("ورود موفق");
      localStorage.setItem("token", state.token);
      router.push("/");
      setUser(state.data);
    }
    if (!state?.isSuccess && state?.message == "404") {
      alert("نام کاربری پیدا نشد");
    }
  }, [state]);
  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">ورود</h1>

        <form action={formAction} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="نام کاربری"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none outline-0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary cursor-pointer text-black rounded-lg font-semibold hover:bg-primary/80 duration-300 transition"
          >
            تایید
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          قبلا ثبت نام کردی؟
          <Link href="/register" className="text-primary font-semibold mx-1">
            ثبت نام
          </Link>
        </p>
      </div>
    </div>
  );
}
