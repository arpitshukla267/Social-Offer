'use client'
import React from "react";
import { motion } from "framer-motion";
import SearchFilters from "./SearchFilters";
import FeaturedSection from "./FeaturedSection";
import InstagramSection from "./Instagram";
import TikTokSection from "./TikTokSection";
import CategoriesSection from "./CategoriesSection";
import Branding from "./Branding";
import SearchHero from "./SearchHero";

function Marketplace() {
  return (
    <div className="px-6 md:px-20 py-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent pb-4"
      >
        Influencer Marketing Made Easy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-500 mt-3"
      >
        Find and hire top Instagram, TikTok, YouTube, and UGC influencers to
        create unique content for your brand
      </motion.p>

      {/* Search Filters & Filter Tags*/}
      <SearchFilters />

     

      {/* Featured Creators */}
      <FeaturedSection
        title="Featured"
        subtitle="Hire top influencers across all platforms"
      />

      {/* Instagram Creators */}
      <InstagramSection
        title="Instagram"
        subtitle="Hire instagram influencers"
      />

      {/* TikTok  Creators */}
      <TikTokSection
        title="TikTok"
        subtitle="Hire tiktok influencers"
      />

      {/* Categories Section */}
      <CategoriesSection/>

      {/* Branding Section */}
      <Branding />
 
      {/* Search Hero Section */}
      <SearchHero />

    </div>
  );
}

export default Marketplace;
