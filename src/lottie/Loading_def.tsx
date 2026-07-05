"use client"

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const MyAnimation = () => {
  const [animationData, setAnimationData] = useState<string | null>(null);

  useEffect(() => {
    fetch("/lottie/Animation - 1744483178508.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return <p>در حال بارگذاری...</p>;

  return (
    <div className="lg:w-[600px] lg:h-[600px] w-[300px] h-[300px]">
      <Lottie alt="loading..." animationData={animationData} />
      <p className="text-lg text-textColorTheme mx-auto w-full text-center">
        لطفا شکیبا باشید...
      </p>
    </div>
  );
};

export default MyAnimation;
