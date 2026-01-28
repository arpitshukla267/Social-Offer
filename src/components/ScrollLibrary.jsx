"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => <div className="bg-transparent w-full h-full" />,
});

/* =======================
   DATA
======================= */

const BOOK_PAGES = [
  "/Book1/1st.webp", // cover
  "/Book1/2nd.webp", // back of cover
  "/Book1/3rd.webp",
  "/Book1/4th.webp",
  "/Book1/5th.webp",
  "/Book1/6th.webp",
  "/Book1/8th.webp",
  "/Book1/9th.webp",
  "/Book1/10th.webp",
  "/Book1/11th.webp",
];

const BOOKS = [
  {
    id: 1,
    title: "Brand Strategy Guide",
    category: "Brand Strategy",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
  {
    id: 2,
    title: "Digital Production",
    category: "Digital Production",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
  {
    id: 3,
    title: "Marketing Excellence",
    category: "Brand Strategy",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
  {
    id: 4,
    title: "Creative Portfolio",
    category: "Digital Production",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
  {
    id: 5,
    title: "Design Showcase",
    category: "Brand Strategy",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
  {
    id: 6,
    title: "Innovation Report",
    category: "Digital Production",
    cover: "/Book1/1st.webp",
    pages: BOOK_PAGES,
  },
];

/* =======================
   PAGE COMPONENT
======================= */

const Page = React.forwardRef(({ image, number }, ref) => {
  const isLeftPage = number % 2 === 0;

  return (
    <div ref={ref} className="relative overflow-hidden bg-transparent">
      {/* Book Spine Junction - More Realistic */}
      <div
        className={`absolute inset-y-0 ${isLeftPage ? "right-0" : "left-0"} md:block hidden`}
        style={{ width: '4px' }}
      >
        {/* Dark center line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/60 z-10" />
        {/* Shadow on left */}
        <div className={`absolute inset-y-0 ${isLeftPage ? "left-0" : "right-0"} w-[2px] bg-gradient-to-r ${isLeftPage ? "from-black/20 to-transparent" : "from-transparent to-black/20"} z-[9]`} />
        {/* Shadow on right */}
        <div className={`absolute inset-y-0 ${isLeftPage ? "right-0" : "left-0"} w-[2px] bg-gradient-to-r ${isLeftPage ? "from-transparent to-black/10" : "from-black/10 to-transparent"} z-[9]`} />
      </div>

      <img
        src={image}
        alt={`Page ${number}`}
        className="w-full h-full object-cover select-none"
        draggable={false}
      />

      <div
        className={`absolute bottom-8 ${
          isLeftPage ? "left-10" : "right-10"
        } z-20`}
      >
        <span className="text-[10px] font-black text-black/40 tracking-[0.2em]">
          {String(number).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
});
Page.displayName = "Page";

/* =======================
   BOOK ITEM
======================= */

function BookReelItem({
  book,
  index,
  isMobile,
  windowDims,
  onInit,
  shouldLoad,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);
  const hasFlippedInitially = useRef(false);

  // Trigger initial half-flip animation when book becomes visible
  useEffect(() => {
    if (!shouldLoad || !flipBookRef.current) return;

    const sectionElement = document.getElementById(`reel-${index}`);
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlippedInitially.current) {
            hasFlippedInitially.current = true;
            setTimeout(() => {
              try {
                const pageFlip = flipBookRef.current?.pageFlip();
                if (pageFlip && typeof pageFlip.flip === 'function') {
                  // Flip to page 1
                  pageFlip.flip(1, "top");
                  // Hold for 1.2 seconds
                  setTimeout(() => {
                    // Flip back to cover
                    pageFlip.flip(0, "top");
                  }, 1200);
                }
              } catch (error) {
                console.log("Page flip animation skipped");
              }
            }, 800);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, index, isMobile]);

  if (!shouldLoad)
    return (
      <section
        id={`reel-${index}`}
        className="h-screen w-full snap-start"
      />
    );

  const onFlip = (e) => {
    const pageIndex = e.data;

    if (!isMobile) setCurrentPage(pageIndex);

    if (pageIndex !== undefined) {
      const audio = new Audio(
        "https://www.soundjay.com/misc/sounds/page-flip-01a.mp3"
      );
      audio.volume = pageIndex === 0 ? 0.3 : 0.2;
      audio.play().catch(() => {});
    }

    // Auto-scroll to next book when finished
    if (pageIndex === book.pages.length - 1) {
      setTimeout(() => {
        const nextSection = document.getElementById(`reel-${index + 1}`);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 1500);
    }
  };

  return (
    <section
      id={`reel-${index}`}
      className="h-screen w-full snap-start flex flex-col items-center justify-center relative"
    >
      {/* Book Title Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-0"
        style={{ willChange: "opacity, transform" }}
      >
        <h2 className="text-2xl md:text-3xl font-black text-nowrap uppercase tracking-tighter text-zinc-900">
          {book.title}
        </h2>
        <div className="h-1 bg-red-600 mt-2" />
      </motion.div>

      <div className="relative w-full h-[70vh] mt-24 flex justify-center items-center">
        {!isMobile ? (
          <motion.div
            animate={{
              x:
                currentPage === 0
                  ? "-25%"
                  : currentPage === book.pages.length - 1
                  ? "25%"
                  : "0%",
            }}
            transition={{ type: "spring", damping: 30, stiffness: 120 }}
            style={{ willChange: "transform" }}
          >
            {/* ================= DESKTOP BOOK ================= */}
            <HTMLFlipBook
              ref={flipBookRef}
              onInit={onInit}
              width={454}
              height={640}
              size="fixed"
              showCover={true}
              startPage={0}
              usePortrait={false}
              onFlip={onFlip}
              drawShadow={false}
              flippingTime={1000}
              swipeDistance={30}
              showPageCorners={false}
              disableFlipByClick
              useMouseEvents={true}
              mobileScrollSupport
              clickEventForward={false}
              style={{ 
                backgroundColor: "transparent",
                willChange: "transform",
                transform: "translateZ(0)"
              }}
            >
              {/* COVER */}
              <Page image={book.pages[0]} number={1} />

              {/* BACK OF COVER */}
              <Page image={book.pages[1]} number={2} />

              {/* REST PAGES */}
              {book.pages.slice(2).map((p, i) => (
                <Page key={i} image={p} number={i + 3} />
              ))}
            </HTMLFlipBook>
          </motion.div>
        ) : (
          /* ================= MOBILE BOOK ================= */
          <HTMLFlipBook
            ref={flipBookRef}
            onInit={onInit}
            width={windowDims.width - 40}
            height={(windowDims.width - 40) * 1.4}
            size="fixed"
            showCover={false}
            usePortrait={true}
            onFlip={onFlip}
            drawShadow={false}
            flippingTime={800}
            swipeDistance={30}
            showPageCorners={false}
            useMouseEvents={true}
            mobileScrollSupport
            clickEventForward={false}
            style={{ 
              willChange: "transform",
              transform: "translateZ(0)"
            }}
          >
            {book.pages.map((p, i) => (
              <Page key={i} image={p} number={i + 1} />
            ))}
          </HTMLFlipBook>
        )}
      </div>
    </section>
  );
}

/* =======================
   MAIN LIBRARY
======================= */

function LibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = parseInt(searchParams.get("id")) || 1;
  const selectedIndex = BOOKS.findIndex((b) => b.id === selectedId);

  const [isMobile, setIsMobile] = useState(false);
  const [windowDims, setWindowDims] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const [isBookReady, setIsBookReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowDims({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);

    const timer = setTimeout(() => setIsBookReady(true), 800);

    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mounted && isBookReady) {
      document
        .getElementById(`reel-${selectedIndex}`)
        ?.scrollIntoView({ behavior: "instant" });
    }
  }, [mounted, isBookReady, selectedIndex]);

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden">
      <AnimatePresence>
        {(!mounted || !isBookReady) && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[500] bg-zinc-950 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute -inset-[100%] bg-[radial-gradient(45%_50%_at_50%_50%,rgba(220,38,38,0.05)_0%,transparent_100%)] rotate-12 transform-gpu" />
            </div>

            <div className="relative z-10">
              <motion.h2
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl font-black uppercase tracking-tighter text-white"
              >
                SOCIAL <span className="text-red-600">OFFER.</span>
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className="h-1 bg-red-600 mt-2"
              />
              <div className="text-[10px] font-mono text-zinc-400 mt-4 tracking-[0.4em] uppercase text-center animate-pulse">
                Opening Selected Archive...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-white">
        {mounted && BOOKS.map((book, idx) => (
          <BookReelItem
            key={book.id}
            book={book}
            index={idx}
            isMobile={isMobile}
            windowDims={windowDims}
            shouldLoad={true}
            onInit={
              idx === selectedIndex
                ? () => setTimeout(() => setIsBookReady(true), 500)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

/* =======================
   EXPORT
======================= */

export default function ScrollLibrary() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-black" />}>
      <LibraryContent />
    </Suspense>
  );
}
