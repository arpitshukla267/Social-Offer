"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowRight, MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";

const BOOK_PAGES_1 = [
  "/Book1/1st.webp", "/Book1/2nd.webp", "/Book1/3rd.webp", "/Book1/4th.webp",
  "/Book1/5th.webp", "/Book1/6th.webp", "/Book1/8th.webp", "/Book1/9th.webp",
  "/Book1/10th.webp", "/Book1/11th.webp"
];

const BOOK_PAGES_2 = [
  "/Book2/1st.jpeg", "/Book2/2nd.jpeg", "/Book2/3rd.jpeg", "/Book2/4th.jpeg",
  "/Book2/5th.jpeg", "/Book2/6th.jpeg", "/Book2/8th.jpeg", "/Book2/9th.jpeg",
  "/Book2/10th.jpeg", "/Book2/11th.jpeg"
];

const BOOK_PAGES_3 = [
  "/Book3/1.png", "/Book3/2.png", "/Book3/3.png", "/Book3/4.png",
  "/Book3/5.png", "/Book3/6.png", "/Book3/8.png", "/Book3/9.png",
  "/Book3/10.png", "/Book3/11.png", "/Book3/12.png", "/Book3/13.png",
  "/Book3/14.png", "/Book3/15.png", "/Book3/16.png", "/Book3/17.png",
  "/Book3/18.png", "/Book3/19.png", "/Book3/20.png", "/Book3/21.png",
  "/Book3/22.png", "/Book3/23.png", "/Book3/24.png", "/Book3/25.png",
];

const BOOK_PAGES_4 = [
  "/Book4/1.png", "/Book4/2.png", "/Book4/3.png", "/Book4/4.png",
  "/Book4/5.png", "/Book4/6.png", "/Book4/8.png", "/Book4/9.png",
  "/Book4/10.png", "/Book4/11.png"
];

const BOOK_PAGES_5 = [
  "/Book5/1.png", "/Book5/2.png", "/Book5/3.png", "/Book5/4.png",
  "/Book5/5.png", "/Book5/6.png", "/Book5/8.png", "/Book5/9.png",
  "/Book5/10.png", "/Book5/11.png"
];

const BOOK_PAGES_6 = [
  "/Book6/1.png", "/Book6/2.png", "/Book6/3.png", "/Book6/4.png",
  "/Book6/5.png", "/Book6/6.png", "/Book6/8.png", "/Book6/9.png",
  "/Book6/10.png", "/Book6/11.png", "/Book6/12.png", "/Book6/13.png",
  "/Book6/14.png", "/Book6/15.png", "/Book6/16.png", "/Book6/17.png",
  "/Book6/18.png"
];

const BOOK_PAGES_7 = [
  "/Book7/1.png", "/Book7/2.png", "/Book7/3.png", "/Book7/4.png",
  "/Book7/5.png", "/Book7/6.png", "/Book7/8.png", "/Book7/9.png",
  "/Book7/10.png", "/Book7/11.png", "/Book7/12.png"
];

const BOOK_PAGES_8 = [
  "/Book8/1.png", "/Book8/2.png", "/Book8/3.png", "/Book8/4.png",
  "/Book8/5.png", "/Book8/6.png", "/Book8/8.png", "/Book8/9.png",
  "/Book8/10.png", "/Book8/11.png", "/Book8/12.png", "/Book8/13.png",
  "/Book8/14.png"
];

const BOOK_PAGES_9 = [
  "/Book9/1.png", "/Book9/2.png", "/Book9/3.png", "/Book9/4.png",
  "/Book9/5.png", "/Book9/6.png", "/Book9/8.png", "/Book9/9.png",
  "/Book9/10.png", "/Book9/11.png", "/Book9/12.png", "/Book9/13.png",
  "/Book9/14.png", "/Book9/15.png", "/Book9/16.png", "/Book9/17.png",
  "/Book9/18.png", "/Book9/19.png", "/Book9/20.png"
];

const BOOKS = [
  {
    id: 1,
    title: "Bonnex Logistics",
    category: "Brand Strategy",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES_1,
  },
  {
    id: 2,
    title: "Rise Engineering Pvt Ltd",
    category: "Digital Production",
    cover: "/Book2/1st.jpeg",
    pages: BOOK_PAGES_2,
  },
  {
    id: 3,
    title: "Himvarsha Foods",
    category: "Brand Strategy",
    cover: "/Book3/1.png",
    pages: BOOK_PAGES_3,
  },
  {
    id: 4,
    title: "Swasth Bharat Healthcare",
    category: "Digital Production",
    cover: "/Book4/1.png",
    pages: BOOK_PAGES_4,
  },
  {
    id: 5,
    title: "Shri Sidhi Infra Projects",
    category: "Brand Strategy",
    cover: "/Book5/1.png",
    pages: BOOK_PAGES_5,
  },
  {
    id: 6,
    title: "Robotics & Ai Labs",
    category: "Digital Production",
    cover: "/Book6/1.png",
    pages: BOOK_PAGES_6,
  },
  {
    id: 7,
    title: "Rise Engineering Pvt Ltd", 
    category: "Brand Strategy",
    cover: "/Book7/1.png",
    pages: BOOK_PAGES_7,
  },
  {
    id: 8,
    title: "BBBPL",
    category: "Brand Strategy",
    cover: "/Book8/1.png",
    pages: BOOK_PAGES_8,
  },
  {
    id: 9,
    title: "Blue Horse Elevator",
    category: "Digital Production",
    cover: "/Book9/1.png",
    pages: BOOK_PAGES_9,
  },
];

const BooksHero = () => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [coversLoaded, setCoversLoaded] = useState(false);

  // Preload all cover images when component mounts
  useEffect(() => {
    const preloadCovers = async () => {
      const coverPromises = BOOKS.map((book) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block
          img.src = book.cover;
        });
      });

      try {
        await Promise.all(coverPromises);
        setCoversLoaded(true);
      } catch (error) {
        // Silently handle errors
        setCoversLoaded(true);
      }
    };

    preloadCovers();
  }, []);

  const handleBookClick = (bookId) => {
    setIsExiting(true);
    // Pass the selected book ID to the reader
    router.push(`/reader?id=${bookId}`);
  };

  return (
    <section id="hero-section" className="relative min-h-screen bg-zinc-50 text-zinc-900 overflow-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {/* Loader removed to avoid duplication with ScrollLibrary loader */}
      </AnimatePresence>

      <motion.div 
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
      {/* Cinematic Tilted Rad Shade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-[100%] bg-[radial-gradient(45%_50%_at_50%_50%,rgba(220,38,38,0.03)_0%,transparent_100%)] rotate-12 transform-gpu" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.02] via-transparent to-zinc-200/50" />
      </div>

      {/* Atmospheric Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/[0.02] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-paper.png')] opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-16 md:pt-32 pb-12 md:pb-20 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-24">
          <div className="max-w-3xl">
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl sm:text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter uppercase mb-6 text-black"
            >
              Social <br className="hidden sm:block" />
              <span className="text-red-600">Offer.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-base md:text-lg max-w-xl leading-relaxed tracking-tight"
            >
              We craft high-end interactive experiences for brands that demand perfection. 
              Explore our digital archive through our proprietary tactile reader.
            </motion.p>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="flex flex-col gap-4 text-left md:text-right items-start md:items-end mt-4 md:mt-0"
          >
            <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">Select archives</div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
                <ArrowRight className="rotate-90 text-red-600" size={14} />
            </div>
          </motion.div>
        </header>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-20">
          {BOOKS.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.8 }}
              onMouseEnter={() => setHoveredId(book.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleBookClick(book.id)}
              className="group relative cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-sm shadow-xl transition-all duration-1000 group-hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)] border border-black/5">
                {/* Background Shadow Text */}
                <div className="absolute top-4 left-4 z-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700">
                    <span className="text-[150px] font-black leading-none text-black">{book.id}</span>
                </div>

                {/* The Book Image */}
                <motion.div 
                  className="w-full h-full relative z-10 p-5"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <div className="w-full h-full relative overflow-hidden ring-1 ring-black/10 group-hover:ring-red-600/50 transition-all duration-700">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                    
                    {/* RED & WHITE GRADIENT OVERLAY (New Request) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                    
                    {/* Inner Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </motion.div>

                {/* Footer Info inside Card */}
                <div className="absolute bg-gradient-to-t from-black/50 to-transparent bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div>
                        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-1">{book.category}</div>
                        <h3 className="text-xl font-black uppercase tracking-tighter line-clamp-1 text-white">{book.title}</h3>
                    </div>
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                        <ArrowRight size={18} />
                    </div>
                </div>
              </div>

              {/* Outside Card Label (Always Visible) */}
              <div className="mt-6 flex justify-between items-start group-hover:opacity-20 transition-opacity duration-500">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest">{String(book.id).padStart(2, '0')} — ARCHIVE</span>
                    <span className="text-xs font-bold uppercase tracking-widest">{book.title}</span>
                </div>
                <div className="text-[9px] text-zinc-600 italic">2024 Collection</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Decorative Numbers */}
      <div className="fixed left-8 top-1/2 -rotate-90 origin-left text-[10px] font-mono text-zinc-800 tracking-[1em] uppercase hidden lg:block">
        Social Offer Archive System // v1.0.2
      </div>
      
      {/* Scroll Down Line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20">
          <div className="w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent relative overflow-hidden">
                <motion.div 
                   animate={{ y: ["-100%", "100%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 left-0 w-full h-1/2 bg-white"
                />
          </div>
      </div>
      </motion.div>
    </section>
  );
};

export default BooksHero;
