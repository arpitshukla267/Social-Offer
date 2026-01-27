"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, MousePointer2, ChevronDown, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => <div className="bg-transparent w-full h-full" />,
});

const BOOK_PAGES = [
  "/Book1/1st.webp",
  "/Book1/2nd.webp",
  "/Book1/3rd.webp",
  "/Book1/4th.webp",
  "/Book1/5th.webp",
  "/Book1/6th.webp",
  "/Book1/8th.webp",
  "/Book1/9th.webp",
  "/Book1/10th.webp",
  "/Book1/11th.webp"
];

const BOOKS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  category: i % 2 === 0 ? "Brand Strategy" : "Digital Production",
  cover: "/Book1/1st.webp",
  pages: BOOK_PAGES,
}));

const Page = React.forwardRef((props, ref) => {
  const isLeftPage = props.number % 2 === 0;
  
  return (
    <div 
      className={`overflow-hidden relative bg-white transform-gpu ${isLeftPage ? 'rounded-l-2xl' : 'rounded-r-2xl'}`} 
      ref={ref} 
      style={{ 
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        backgroundColor: 'white'
      }}
    >
      {/* SIMPLE SPINE INDICATOR */}
      <div className={`absolute inset-y-0 w-[1px] z-[10] bg-black/5 
        ${isLeftPage ? 'right-0' : 'left-0'}`} 
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* GRADIENT SHADOW - Simplified to 1 layer for stability */}
      <div className={`absolute inset-y-0 w-24 z-[5] pointer-events-none 
        ${isLeftPage 
          ? 'right-0 bg-gradient-to-l from-black/10 to-transparent' 
          : 'left-0 bg-gradient-to-r from-black/10 to-transparent'
        }`} 
        style={{ transform: 'translateZ(0.5px)' }}
      />

      {/* PAGE CONTENT */}
      <div className="w-full h-full p-1" style={{ transform: 'translateZ(0px)' }}>
        <img 
          src={props.image} 
          alt={`Page ${props.number}`} 
          className="w-full h-full object-cover select-none" 
          loading="eager"
        />
      </div>
      
      {/* Page Number */}
      <div 
        className={`absolute bottom-8 ${isLeftPage ? 'left-10' : 'right-10'} z-[15] flex items-center gap-2`}
        style={{ transform: 'translateZ(2px)' }}
      >
        <span className="text-[10px] font-black text-black/40 tracking-[0.2em]">
          {String(props.number).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
});
Page.displayName = "Page";

const BookReelItem = ({ book, index, isMobile, windowDims, onInit, shouldLoad }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);

  if (!shouldLoad) {
    return (
      <section id={`reel-${index}`} className="h-screen w-full snap-start relative flex items-center justify-center bg-zinc-100" />
    );
  }

  const onFlip = (e) => {
    const pageIndex = e.data;
    setCurrentPage(pageIndex);

    // Dynamic Sound Logic
    if (pageIndex !== undefined) {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/page-flip-01a.mp3");
      audio.volume = pageIndex === 0 ? 0.3 : 0.2;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }

    // Auto-scroll logic: If we reached the very last page
    if (pageIndex === book.pages.length - 1) {
      setTimeout(() => {
        const nextSection = document.getElementById(`reel-${index + 1}`);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500); // Give time to see the "Finished" shift (25%)
    }
  };

  return (
    <section 
      id={`reel-${index}`}
      className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden shrink-0"
    >
      {/* PROFESSIONAL BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Large Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none opacity-[0.02] select-none">
            <span className="text-[25vw] font-black uppercase tracking-tighter text-black select-none leading-none pointer-events-none">
               {index + 1}
            </span>
        </div>

        {/* Tilted Rad Shade Layer */}
        <div className="absolute -inset-[100%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(220,38,38,0.03)_0%,transparent_100%)] rotate-[15deg] transform-gpu" />
        
        {/* Gutter Linear Shade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200/50 via-transparent to-red-600/[0.01]" />

        {/* Technical Layout Frames */}
        <div className="absolute inset-20 border-[0.5px] border-black/[0.03] rounded-[40px]" />
        
        {/* Corner Brackets (The "Scope" Look) */}
        <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-black/10 rounded-tl-xl" />
        <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-black/10 rounded-tr-xl" />
        <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-black/10 rounded-bl-xl" />
        <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-black/10 rounded-br-xl" />

        {/* Archive Labeling */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-red-600/20" />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[1em]">Archive Ref: {String(index + 1).padStart(2, '0')}</span>
            <div className="w-12 h-[1px] bg-red-600/20" />
        </div>
      </div>

      {/* Main Diffused Center Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,0,0,0.02)_0%,rgba(245,245,245,1)_100%)]" />
      
      {/* Interactive Book - Now covering MAX screen */}
      <div className="relative w-full flex justify-center items-center h-[75vh] md:h-[80vh]">
        {!isMobile ? (
          <motion.div 
            animate={{ 
              x: currentPage === 0 ? "-25%" : (currentPage === book.pages.length - 1 ? "25%" : "0%")
            }}
            transition={{ type: "spring", damping: 30, stiffness: 120 }}
            className="relative"
          >
            <HTMLFlipBook
              key={`${book.id}-${isMobile}`}
              ref={flipBookRef}
              onInit={onInit}
              width={650}
              height={880}
              size="stretch"
              minWidth={450}
              maxWidth={1400}
              minHeight={600}
              maxHeight={1800}
              showCover={true}
              usePortrait={false}
              onFlip={onFlip}
              drawShadow={false}
              flippingTime={800}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={false}
              disableFlipByClick={true}
              mobileScrollSupport={true}
              clickEventForward={false}
              startZIndex={0}
              style={{ backgroundColor: 'white' }}
              className="shadow-2xl"
            >
              {book.pages.map((p, i) => (
                <Page key={i} number={i + 1} image={p} />
              ))}
            </HTMLFlipBook>
          </motion.div>
        ) : (
          <div className="relative">
            <HTMLFlipBook
              key={`${book.id}-mobile`}
              ref={flipBookRef}
              onInit={onInit}
              width={380}
              height={550}
              size="stretch"
              minWidth={300}
              maxWidth={1400}
              minHeight={400}
              maxHeight={1800}
              showCover={true}
              usePortrait={true}
              onFlip={onFlip}
              drawShadow={false}
              flippingTime={800}
              useMouseEvents={true}
              swipeDistance={5}
              showPageCorners={false}
              disableFlipByClick={true}
              mobileScrollSupport={true}
              clickEventForward={false}
              startZIndex={0}
              style={{ backgroundColor: 'white' }}
              className="shadow-2xl"
            >
              {book.pages.map((p, i) => (
                <Page key={i} number={i + 1} image={p} />
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>
    </section>
  );
};

function LibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = parseInt(searchParams.get("id")) || 1;
  const selectedIndex = BOOKS.findIndex(b => b.id === selectedId);

  const [isMobile, setIsMobile] = useState(false);
  const [windowDims, setWindowDims] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const [isBookReady, setIsBookReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowDims({ width: window.innerWidth, height: window.innerHeight });
    };
    check();
    window.addEventListener("resize", check);

    // FAIL-SAFE: If the book takes more than 3s to initialize, show the page anyway
    const timer = setTimeout(() => {
      setIsBookReady(true);
    }, 3000);

    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer);
    };
  }, []);

  // Handle scrolling to the selected book once it's ready
  useEffect(() => {
    if (isBookReady && mounted) {
      const target = document.getElementById(`reel-${selectedIndex}`);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [isBookReady, mounted, selectedIndex]);

  if (!mounted || !isBookReady) return (
    <div className="fixed inset-0 z-[500] bg-transparent flex flex-col items-center justify-center">
      {/* Cinematic Lighter Atmosphere for Loader */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-[100%] bg-[radial-gradient(45%_50%_at_50%_50%,rgba(220,38,38,0.03)_0%,transparent_100%)] rotate-12 transform-gpu" />
      </div>
      
      <div className="relative z-10">
        <motion.h2 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl font-black uppercase tracking-tighter text-black"
        >
          SOCIAL <span className="text-red-600">OFFER.</span>
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-red-600 mt-2"
        />
        <div className="text-[10px] font-mono text-zinc-400 mt-4 tracking-[0.4em] uppercase text-center animate-pulse">
           Opening Selected Archive...
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full bg-zinc-100 text-zinc-900 overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar font-sans"
    >
      {/* Reels List */}
      {BOOKS.map((book, idx) => {
        // Condition: Load if it's the selected book, OR if selected book is ready, load next two
        const shouldLoad = idx === selectedIndex || (isBookReady && idx > selectedIndex && idx <= selectedIndex + 2);

        return (
          <BookReelItem 
            key={book.id} 
            book={book} 
            index={idx} 
            isMobile={isMobile} 
            windowDims={windowDims}
            shouldLoad={shouldLoad}
            onInit={idx === selectedIndex ? () => {
              // Ensure the component has a couple of frames to paint before revealing
              setTimeout(() => setIsBookReady(true), 300);
            } : undefined}
          />
        );
      })}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Fix flickering during 3D transforms */
        .stf__parent {
          perspective: 3000px !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          touch-action: pan-y !important;
          background-color: transparent !important;
        }
        .stf__block {
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
          will-change: transform;
          background-color: white !important; /* Ensure solid blocks */
        }
        .stf__item {
          background-color: white !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
        }
        img {
          -webkit-user-drag: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          backface-visibility: hidden !important;
          transform: translateZ(0); /* Force layering */
        }
        canvas {
          display: none !important;
        }
        /* Prevent selection flickering */
        * {
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </motion.div>
  );
}

export default function ScrollLibrary() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-zinc-50" />}>
      <LibraryContent />
    </Suspense>
  );
}
