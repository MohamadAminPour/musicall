"use server";

export default async function registerAction(prevState: any, formData: FormData){
  const username = formData.get("username");
  const BASE_API = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${BASE_API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username }),
  });
  const data = await res.json();
  if (res.status == 400) {
    return {
      message: "400",
      isSuccess: false,
      data:null
    };
  }
  return {
    message: "200",
    isSuccess: true,
    token: data.token,
    data:data.user
  };

}