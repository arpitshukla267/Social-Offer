import React from "react";
import CreatorCard from "../ui/CreatorCard";

function FeaturedSection({ title, subtitle }) {
  // ✅ Dummy creators data
  const creators = [
    {
      id: 1,
      name: "Brandon Diau",
      role: "Professional Football Player",
      location: "London, LND, GB",
      price: "50",
      rating: 5.0,
      tags: ["Top Creator", "Responds Fast"],
      image:
        "https://i.pinimg.com/1200x/cd/da/10/cdda1069e53bff9ffbea62658b495422.jpg",
    },
    {
      id: 2,
      name: "Kevin Cuenca",
      role: "Emmy Award-Winning TV Reporter",
      location: "Los Angeles, CA, US",
      price: "200",
      rating: 5.0,
      tags: ["Top Creator"],
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Hollie",
      role: "Health, Fitness and Wellness",
      location: "Cardiff, CRF, GB",
      price: "50",
      rating: 4.9,
      tags: ["Top Creator"],
      image:
        "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Isaiah Lamb",
      role: "Verified Fitness Content Creator",
      location: "Baltimore, MD, US",
      price: "300",
      rating: 5.0,
      tags: ["Top Creator", "Responds Fast"],
      image:
        "https://images.unsplash.com/photo-1594737625785-cd0a2243f4d1?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="w-full mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          See All
        </button>
      </div>

      {/* Creator Grid */}
      <div className="grid overflow-x-auto md:overflow-hidden md:grid-cols-3 lg:grid-cols-4 gap-6">
        {creators.map((creator, idx) => (
          <CreatorCard
            key={creator.id || idx}
            image={creator.image}
            name={creator.name}
            rating={creator.rating}
            description={creator.role}
            location={creator.location}
            price={creator.price}
            badges={creator.tags?.map((t) => ({ text: t }))}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedSection;
