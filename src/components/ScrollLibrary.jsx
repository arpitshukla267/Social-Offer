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

const BOOK_PAGES_1 = [
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

const BOOK_PAGES_2 = [
  "/Book2/1st.jpeg", // cover
  "/Book2/2nd.jpeg", // back of cover
  "/Book2/3rd.jpeg",
  "/Book2/4th.jpeg",
  "/Book2/5th.jpeg",
  "/Book2/6th.jpeg",
  "/Book2/8th.jpeg",
  "/Book2/9th.jpeg",
  "/Book2/10th.jpeg",
  "/Book2/11th.jpeg",
];

const BOOK_PAGES_3 = [
  "/Book3/1st.jpeg", // cover
  "/Book3/2nd.jpeg", // back of cover
  "/Book3/3rd.jpeg",
  "/Book3/4th.jpeg",
  "/Book3/5th.jpeg",
  "/Book3/6th.jpeg",
  "/Book3/8th.jpeg",
  "/Book3/9th.jpeg",
  "/Book3/10th.jpeg",
  "/Book3/11th.jpeg",
  "/Book3/12th.jpeg",
  "/Book3/13th.jpeg",
  "/Book3/14th.jpeg",
  "/Book3/15th.jpeg",
  "/Book3/16th.jpeg",
];

const BOOK_PAGES_4 = [
  "/Book4/1.png", // cover
  "/Book4/2.png", // back of cover
  "/Book4/3.png",
  "/Book4/4.png",
  "/Book4/5.png",
  "/Book4/6.png",
  "/Book4/8.png",
  "/Book4/9.png",
  "/Book4/10.png",
  "/Book4/11.png",
  "/Book4/12.png",
  "/Book4/13.png",
  "/Book4/14.png",
  "/Book4/15.png",
  "/Book4/16.png",
];

const BOOK_PAGES_5 = [

  "/Book5/1.png", // cover
  "/Book5/2.png", // back of cover
  "/Book5/3.png",
  "/Book5/4.png",
  "/Book5/5.png",
  "/Book5/6.png",
  "/Book5/8.png",
  "/Book5/9.png",
  "/Book5/10.png",
  "/Book5/11.png",
  "/Book5/12.png",
  "/Book5/13.png",
  "/Book5/14.png",
  "/Book5/15.png",
];

const BOOK_PAGES_6 = [
  "/Book6/1.png", // cover
  "/Book6/2.png", // back of cover
  "/Book6/3.png",
  "/Book6/4.png",
  "/Book6/5.png",
  "/Book6/6.png",
  "/Book6/8.png",
  "/Book6/9.png",
  "/Book6/10.png",
  "/Book6/11.png",
  "/Book6/12.png",
  "/Book6/13.png",
  "/Book6/14.png",
  "/Book6/15.png",
  "/Book6/16.png",
  "/Book6/17.png",
  "/Book6/18.png",
];

const BOOK_PAGES_7 = [
  "/Book7/1.png", // cover
  "/Book7/2.png", // back of cover
  "/Book7/3.png",
  "/Book7/4.png",
  "/Book7/5.png",
  "/Book7/6.png",
  "/Book7/8.png",
  "/Book7/9.png",
  "/Book7/10.png",
  "/Book7/11.png",
  "/Book7/12.png",
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
    title: "Swasth Bharat Healthcare",
    category: "Brand Strategy",
    cover: "/Book3/1st.jpeg",
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
];

/* =======================
   PAGE COMPONENT
======================= */

const Page = React.forwardRef(({ image, number, isMobile }, ref) => {
  const isLeftPage = number % 2 === 0;

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden bg-transparent"
      style={{
        width: '100%',
        height: '100%',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        position: 'relative'
      }}
    >
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
        className="absolute inset-0 w-full h-full select-none"
        draggable={false}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: isMobile ? 'contain' : 'cover',
          objectPosition: 'center',
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          imageRendering: "auto"
        }}
      />

      <div
        className={`absolute bottom-4 md:bottom-8 ${
          isLeftPage ? "left-4 md:left-10" : "right-4 md:right-10"
        } z-20`}
      >
        <span className="text-[8px] md:text-[10px] font-black text-black/40 tracking-[0.2em]">
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
  isSelectedBook,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);
  const hasFlippedInitially = useRef(false);
  const pageFlipReady = useRef(false);
  const isMountedRef = useRef(true);
  const timeoutRefs = useRef([]);

  // Cleanup function
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Clear all timeouts
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      timeoutRefs.current = [];
      
      // Safely cleanup flip book
      try {
        if (flipBookRef.current) {
          const pageFlip = flipBookRef.current?.pageFlip?.();
          if (pageFlip && typeof pageFlip.destroy === 'function') {
            // Don't call destroy as it might cause removeChild errors
            // The library should handle cleanup itself
          }
        }
      } catch (error) {
        // Silently handle cleanup errors
      }
    };
  }, []);

  // Wait for pageFlip to be ready before triggering animation
  const handleInit = () => {
    if (!isMountedRef.current) return;
    
    try {
      if (onInit) onInit();
      pageFlipReady.current = true;
      
      // For the selected book (first book), trigger flip animation after initialization
      // Works for both desktop and mobile
      if (isSelectedBook && !hasFlippedInitially.current) {
        const delay = isMobile ? 1200 : 900;
        const timeout1 = setTimeout(() => {
          if (!isMountedRef.current || !flipBookRef.current) return;
          
          try {
            const pageFlip = flipBookRef.current?.pageFlip?.();
            if (pageFlip && typeof pageFlip.flip === 'function' && !hasFlippedInitially.current && isMountedRef.current) {
              hasFlippedInitially.current = true;
              // Use requestAnimationFrame for smoother animation
              requestAnimationFrame(() => {
                if (!isMountedRef.current || !flipBookRef.current) return;
                try {
                  // Check if pageFlip is still valid
                  const currentPageFlip = flipBookRef.current?.pageFlip?.();
                  if (currentPageFlip && typeof currentPageFlip.flip === 'function' && isMountedRef.current) {
                    // Flip to page 1
                    currentPageFlip.flip(1, "top");
                    // Hold for 1.2 seconds
                    const timeout2 = setTimeout(() => {
                      if (!isMountedRef.current || !flipBookRef.current) return;
                      try {
                        const finalPageFlip = flipBookRef.current?.pageFlip?.();
                        if (finalPageFlip && typeof finalPageFlip.flip === 'function' && isMountedRef.current) {
                          // Flip back to cover
                          finalPageFlip.flip(0, "top");
                        }
                      } catch (error) {
                        // Silently handle error - prevent removeChild errors
                      }
                    }, 1200);
                    timeoutRefs.current.push(timeout2);
                  }
                } catch (error) {
                  // Silently handle error - prevent removeChild errors
                }
              });
            }
          } catch (error) {
            // Silently handle error - prevent removeChild errors
          }
        }, delay);
        timeoutRefs.current.push(timeout1);
      }
    } catch (error) {
      // Silently handle initialization errors
    }
  };

  // Trigger initial half-flip animation when book becomes visible (for non-selected books)
  useEffect(() => {
    if (!shouldLoad || isSelectedBook || !isMountedRef.current) return;

    const sectionElement = document.getElementById(`reel-${index}`);
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlippedInitially.current && isMountedRef.current) {
            // Wait for pageFlip to be ready
            const checkAndFlip = () => {
              if (!isMountedRef.current) return;
              
              if (!pageFlipReady.current || !flipBookRef.current) {
                const timeout = setTimeout(checkAndFlip, 100);
                timeoutRefs.current.push(timeout);
                return;
              }
              
              if (!isMountedRef.current) return;
              
              hasFlippedInitially.current = true;
              const timeout1 = setTimeout(() => {
                if (!isMountedRef.current || !flipBookRef.current) return;
                
                try {
                  const pageFlip = flipBookRef.current?.pageFlip?.();
                  if (pageFlip && typeof pageFlip.flip === 'function' && isMountedRef.current) {
                    // Use requestAnimationFrame for smoother animation
                    requestAnimationFrame(() => {
                      if (!isMountedRef.current || !flipBookRef.current) return;
                      try {
                        // Check if pageFlip is still valid
                        const currentPageFlip = flipBookRef.current?.pageFlip?.();
                        if (currentPageFlip && typeof currentPageFlip.flip === 'function' && isMountedRef.current) {
                          // Flip to page 1
                          currentPageFlip.flip(1, "top");
                          // Hold for 1.2 seconds
                          const timeout2 = setTimeout(() => {
                            if (!isMountedRef.current || !flipBookRef.current) return;
                            try {
                              const finalPageFlip = flipBookRef.current?.pageFlip?.();
                              if (finalPageFlip && typeof finalPageFlip.flip === 'function' && isMountedRef.current) {
                                // Flip back to cover
                                finalPageFlip.flip(0, "top");
                              }
                            } catch (error) {
                              // Silently handle error - prevent removeChild errors
                            }
                          }, 1200);
                          timeoutRefs.current.push(timeout2);
                        }
                      } catch (error) {
                        // Silently handle error - prevent removeChild errors
                      }
                    });
                  }
                } catch (error) {
                  // Silently handle error - prevent removeChild errors
                }
              }, isMobile ? 1000 : 800);
              timeoutRefs.current.push(timeout1);
            };
            
            checkAndFlip();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, index, isMobile, isSelectedBook]);

  if (!shouldLoad)
    return (
      <section
        id={`reel-${index}`}
        className="h-screen w-full snap-start"
      />
    );

  const onFlip = (e) => {
    if (!isMountedRef.current) return;
    
    const pageIndex = e.data;

    if (!isMobile) {
      // Use requestAnimationFrame for smoother state updates
      requestAnimationFrame(() => {
        if (isMountedRef.current) {
          setCurrentPage(pageIndex);
        }
      });
    }

    if (pageIndex !== undefined && isMountedRef.current) {
      try {
        const audio = new Audio(
          "https://www.soundjay.com/misc/sounds/page-flip-01a.mp3"
        );
        audio.volume = pageIndex === 0 ? 0.3 : 0.2;
        audio.play().catch(() => {});
      } catch (error) {
        // Silently handle audio errors
      }
    }

    // Auto-scroll to next book when finished
    if (pageIndex === book.pages.length - 1 && isMountedRef.current) {
      const timeout = setTimeout(() => {
        if (!isMountedRef.current) return;
        const nextSection = document.getElementById(`reel-${index + 1}`);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 1500);
      timeoutRefs.current.push(timeout);
    }
  };

  return (
    <section
      id={`reel-${index}`}
      className={`h-screen w-full snap-start flex flex-col ${isMobile ? 'justify-start pt-4' : 'justify-center'} items-center relative`}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
    >
      {/* Book Title Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: isMobile ? 0.2 : 0.3, 
          duration: isMobile ? 0.4 : 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={`absolute ${isMobile ? 'top-6' : 'top-12'} left-1/2 -translate-x-1/2 z-0 px-4`}
        style={{ 
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-black ${isMobile ? 'text-nowrap' : 'text-nowrap'} uppercase tracking-tighter text-zinc-900 text-center`}>
          {book.title}
        </h2>
        <div className="h-1 bg-red-600 mt-2 mx-auto" style={{ width: isMobile ? '80%' : '100%' }} />
      </motion.div>

      <div className={`relative w-full ${isMobile ? 'h-[85vh] mt-16' : 'h-[70vh] mt-24'} flex justify-center items-center`}>
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
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 120,
              mass: 0.5
            }}
            style={{ 
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            {/* ================= DESKTOP BOOK ================= */}
            <HTMLFlipBook
              ref={flipBookRef}
              onInit={handleInit}
              width={454}
              height={620}
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
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
                WebkitPerspective: 1000
              }}
            >
              {/* COVER */}
              <Page image={book.pages[0]} number={1} isMobile={false} />

              {/* BACK OF COVER */}
              <Page image={book.pages[1]} number={2} isMobile={false} />

              {/* REST PAGES */}
              {book.pages.slice(2).map((p, i) => (
                <Page key={i} image={p} number={i + 3} isMobile={false} />
              ))}
            </HTMLFlipBook>
          </motion.div>
        ) : (
          /* ================= MOBILE BOOK ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother animation
            }}
            className="w-full flex justify-center items-center"
            style={{ 
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              perspective: 1000
            }}
          >
            <HTMLFlipBook
              ref={flipBookRef}
              onInit={handleInit}
              width={Math.min(windowDims.width - 20, 400)}
              height={Math.min((windowDims.width - 20) * 1.4, 560)}
              size="fixed"
              showCover={false}
              usePortrait={true}
              onFlip={onFlip}
              drawShadow={false}
              flippingTime={isMobile ? 600 : 800}
              swipeDistance={isMobile ? 25 : 30}
              showPageCorners={false}
              useMouseEvents={true}
              mobileScrollSupport
              clickEventForward={false}
              style={{ 
                willChange: "transform",
                transform: "translateZ(0)",
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
                WebkitPerspective: 1000
              }}
            >
              {book.pages.map((p, i) => (
                <Page key={i} image={p} number={i + 1} isMobile={true} />
              ))}
            </HTMLFlipBook>
          </motion.div>
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

  // Filter books to only show selected book and books after it (no preceding books)
  // Reorder so selected book is first
  const filteredBooks = selectedIndex >= 0 
    ? [
        BOOKS[selectedIndex], // Selected book first
        ...BOOKS.slice(selectedIndex + 1) // Books after selected book
      ]
    : BOOKS;

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
      // Scroll to the first book (which is the selected one)
      document
        .getElementById(`reel-0`)
        ?.scrollIntoView({ behavior: "instant" });
    }
  }, [mounted, isBookReady]);

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

      <div className={`h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-white ${isMobile ? 'overscroll-none' : ''}`}>
        {mounted && filteredBooks.map((book, idx) => (
          <BookReelItem
            key={book.id}
            book={book}
            index={idx}
            isMobile={isMobile}
            windowDims={windowDims}
            shouldLoad={true}
            isSelectedBook={idx === 0}
            onInit={
              idx === 0
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
