"use client";
import React from "react";
import CreatorCard from "../ui/CreatorCard";

function TikTokSection() {
  const creators = [
    {
      id: 1,
      image: "/creators/luke.jpg",
      name: "Luke Mizel",
      rating: 5.0,
      followers: "75.7k",
      description: "Ugc Pro, Short-Form Content Expert",
      location: "San Diego, CA, US",
      price: 500,
      badges: ["Top Creator"],
    },
    {
      id: 2,
      image: "/creators/annabelle.jpg",
      name: "Annabelle Santerre",
      rating: 5.0,
      followers: "1.6k",
      description: "Professional Creator",
      location: "Salt Lake City, UT, US",
      price: 50,
      badges: ["Top Creator"],
    },
    {
      id: 3,
      image: "/creators/sophie.jpg",
      name: "Sophie Mcguinness",
      rating: 5.0,
      followers: "7.4k",
      description: "Content Creator, Ugc, Model",
      location: "Dublin, IE",
      price: 150,
      badges: [],
    },
    {
      id: 4,
      image: "/creators/johnstyle.jpg",
      name: "Johnstyle",
      rating: 5.0,
      followers: "686.0k",
      description: "Fashion & Lifestyle Content Creator",
      location: "Toronto, ON, CA",
      price: 1500,
      badges: [],
    },
  ];

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">TikTok</h2>
          <p className="text-sm text-gray-500">Hire TikTok influencers</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          See All
        </button>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            image={creator.image}
            name={creator.name}
            rating={creator.rating}
            description={creator.description}
            location={creator.location}
            price={creator.price}
            badges={creator.badges?.map((b) => ({ text: b }))}
            followers={creator.followers}
            platform="tiktok" // 👈 you can use this inside CreatorCard to render the TikTok icon
          />
        ))}
      </div>
    </div>
  );
}

export default TikTokSection;
