"use client";

import React, { useState } from "react";

interface ITxt {
  txt: string;
}

export default function SongText({ txt }: ITxt) {
  const [showText, setShowText] = useState(false);
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-3">متن آهنگ</h2>
      <p className="whitespace-pre-line text-gray-700">
        {showText ? txt.slice(0, 1000000) : txt.slice(0, 200) + "..."}
      </p>
      <button className="cursor-pointer" onClick={() => setShowText(!showText)}>
        {showText ? "نمایش کمتر" : "نمایش بیشتر..."}
      </button>
    </div>
  );
}
