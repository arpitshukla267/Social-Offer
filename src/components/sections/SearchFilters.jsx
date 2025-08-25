'use client'
import React from "react";
import { Sun, TrendingUp, Flame, DollarSign, Zap, Award } from "lucide-react";

function SearchFilters() {
  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      {/* Search Bar */}
      <div className="w-full md:w-[800px] bg-white rounded-full shadow-md flex items-center overflow-hidden">
        {/* Platform */}
        <div className="flex-1 px-6 py-4">
          <p className="text-sm font-medium text-gray-700">Platform</p>
          <input
            type="text"
            placeholder="Choose a platform"
            className="w-full text-gray-400 text-sm focus:outline-none bg-transparent"
          />
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200 h-10"></div>

        {/* Category */}
        <div className="flex-1 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Category</p>
            <input
              type="text"
              placeholder="Enter keywords, niches or categories"
              className="w-full text-gray-400 text-sm focus:outline-none bg-transparent"
            />
          </div>

          {/* Search Icon Button */}
          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { icon: Sun, text: "Rising Stars" },
          { icon: TrendingUp, text: "Most Viewed" },
          { icon: Flame, text: "Trending" },
          { icon: DollarSign, text: "Under $250" },
          { icon: Zap, text: "Fast Turnover" },
          { icon: Award, text: "Top Creator" },
        ].map((filter, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-lg hover:shadow-md hover:bg-gray-50 transition text-sm font-medium"
          >
            <filter.icon className="w-4 h-4 text-gray-700" />
            {filter.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilters;
