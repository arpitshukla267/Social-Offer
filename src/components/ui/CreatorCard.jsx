"use client";
import React from "react";
import { Star, Camera } from "lucide-react";

function CreatorCard({
  image,
  name,
  rating,
  description,
  location,
  price,
  badges = [],
  tag = "UGC",
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition p-2">
      {/* Image Section */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={image || "/default.jpg"}
          alt={name || "Creator"}
          className="w-full h-64 object-cover"
        />

        {/* Dynamic Badges */}
        {badges?.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
              >
                {badge.icon} {badge.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Default Tag */}
          {tag && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Camera size={14} /> {tag}
            </span>
          )}

          <span className="font-semibold text-sm">{name || "Unnamed"}</span>

          {rating && (
            <div className="flex items-center text-yellow-500 text-sm">
              <Star size={14} className="fill-yellow-500" /> {rating}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description || "No description available."}
        </p>

        {location && (
          <p className="text-xs text-blue-500 mt-1">{location}</p>
        )}

        <div className="flex justify-between items-center mt-2">
          {price && <span className="font-semibold text-gray-900">${price}</span>}
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;
