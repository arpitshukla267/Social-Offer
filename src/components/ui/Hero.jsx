"use client";
import React from "react";
import Image from "next/image";

function Hero({
  buttonText,
  title,
  descriptionBlocks,
  imageSrc,
  imageAlt = "Hero Image",
}) {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6">
          {buttonText && (
            <button className="self-start px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium shadow-md hover:opacity-90">
              {buttonText}
            </button>
          )}

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
            {title}
          </h1>

          <div className="flex flex-col gap-6 text-gray-600">
            {descriptionBlocks?.map((block, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-black">{block.heading}</h3>
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={450}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
