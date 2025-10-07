import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className='flex items-center justify-center flex-col text-center gap-4 h-[90vh]'>
     <p className='text-5xl'>صفحه پیدا نشد !</p>
     <p className='text-[1.2rem] text-zinc-500 '>این صفحه یا وجود ندارد یا ساخته نشده است <br /> برای برگشت دکمه زیر را بزنید .</p>
     <Link href={"/"} className='bg-primary px-6 py-2 rounded-lg duration-300 hover:bg-primary/80'>برگشت به خانه</Link>
    </div>
  )
}
