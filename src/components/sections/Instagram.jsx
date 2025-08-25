"use client";
import React from "react";
import CreatorCard from "../ui/CreatorCard";

function InstagramSection() {
  const creators = [
    {
      id: 1,
      image: "/creators/april.jpg",
      name: "April Pollock",
      rating: 4.7,
      followers: "16.4k",
      description: "Lifestyle Influencer, Boutique Content Creator",
      location: "Sammamish, WA, US",
      price: 70,
      badges: ["Top Creator", "Responds Fast"],
    },
    {
      id: 2,
      image: "/creators/sophia.jpg",
      name: "Sophia Puliafico",
      rating: 5.0,
      followers: "1.0k",
      description: "Beauty Marketer & Content Creator",
      location: "Vancouver, WA, US",
      price: 100,
      badges: [],
    },
    {
      id: 3,
      image: "/creators/louise.jpg",
      name: "Louise Barnard",
      rating: 5.0,
      followers: "67.6k",
      description: "Model, Beauty And Skin Care Enthusiast",
      location: "Miami, FL, US",
      price: 1000,
      badges: [],
    },
    {
      id: 4,
      image: "/creators/marcel.jpg",
      name: "Marcel Williams",
      rating: 5.0,
      followers: "196.7k",
      description: "Entertainment And Lifestyle Creator",
      location: "Los Angeles, CA, US",
      price: 1000,
      badges: [],
    },
  ];

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Instagram</h2>
          <p className="text-sm text-gray-500">Hire Instagram influencers</p>
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
          />
        ))}
      </div>
    </div>
  );
}

export default InstagramSection;
