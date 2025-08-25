"use client";
import React from "react";
import Link from "next/link";

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: "Fashion",
      image: "/categories/fashion.jpg",
      slug: "fashion",
    },
    {
      id: 2,
      name: "Music & Dance",
      image: "/categories/music-dance.jpg",
      slug: "music-dance",
    },
    {
      id: 3,
      name: "Beauty",
      image: "/categories/beauty.jpg",
      slug: "beauty",
    },
    {
      id: 4,
      name: "Travel",
      image: "/categories/travel.jpg",
      slug: "travel",
    },
  ];

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6">Categories</h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.slug}`}>
            <div className="relative rounded-2xl overflow-hidden cursor-pointer group">
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover bg-amber-300 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay Title */}
              <div className="absolute bottom-3 left-3 text-black font-semibold text-lg drop-shadow-md">
                {cat.name}
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
