"use client";

import { cn } from "../../libs/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  renderItem,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag state
  const dragStartX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Initialize duplication
  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
        // Simple deduplication check: if children count > items count, we already duplicated.
        // We only want to duplicate ONCE for the loop effect.
        if (scrollerRef.current.children.length === items.length) {
            const scrollerContent = Array.from(scrollerRef.current.children);
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                // Ensure duplicate has aria-hidden for accessibility if needed, 
                // but for visual consistency just append.
                scrollerRef.current.appendChild(duplicatedItem);
            });
        }
    }
  }, [items]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;

    const animate = (time) => {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;
        lastTime = time;

        if (!isPaused && !isDragging && containerRef.current) {
            const container = containerRef.current;
            
            // Calculate pixel movement
            // standard speed: fast ~ 50px/sec? 
            // "fast" was 20s for full scroll in CSS.
            // Let's use a pixel value. 
            // 20s for 50% width. Width is variable. 
            // Let's approximate logical speeds.
            const moveSpeed = speed === "fast" ? 1.5 : speed === "normal" ? 1 : 0.5; 
            
            const directionMultiplier = direction === "right" ? -1 : 1;
            
            container.scrollLeft += moveSpeed * directionMultiplier * (delta / 16); // Normalize to ~60fps

            // Infinite Loop Reset
            // We scroll the CONTAINER.
            // If scrollLeft >= scrollWidth / 2, reset to 0.
            // (Assumes "left" direction, for "right" direction logic is inverse or we just start at max?)
            // Actually, for "right" direction (moving right), content moves Right -> Left visually? 
            // Wait, CSS animation direction "normal" (left) moves translateX(0) to (-50%). Content moves LEFT.
            // CSS "reverse" (right) moves translateX(-50%) to (0). Content moves RIGHT.
            
            // JS ScrollLeft always moves viewport RIGHT (content moves LEFT).
            // To move content RIGHT, we behave inversely or just use scrollLeft--?
            // If direction is "right" (content moves right), we DECREASE scrollLeft.
            
            if (direction === "left") {
                 if (container.scrollLeft >= container.scrollWidth / 2) {
                     container.scrollLeft = 0;
                 }
            } else {
                 if (container.scrollLeft <= 0) {
                     container.scrollLeft = container.scrollWidth / 2;
                 }
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize scroll position if moving right
    if (direction === "right" && containerRef.current && containerRef.current.scrollLeft === 0) {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth / 2;
    }

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, speed, isPaused, isDragging]);


  // Drag Event Handlers
  const onMouseDown = (e) => {
      setIsDragging(true);
      dragStartX.current = e.pageX || e.touches?.[0].pageX;
      scrollLeftStart.current = containerRef.current.scrollLeft;
      // Disable text selection during drag
      document.body.style.userSelect = "none";
  };

  const onMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      const x = e.pageX || e.touches?.[0].pageX;
      const walk = (x - dragStartX.current) * 1.5; // Scroll-fast factor
      containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full max-w-[100vw] overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] cursor-grab active:cursor-grabbing",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
          pauseOnHover && setIsPaused(false);
          if (isDragging) onMouseUp();
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4 items-stretch", // Added items-stretch for uniform height
        )}
      >
        {items.map((item, idx) => (
           <li 
             key={`${idx}-${item.name}`}
             className="w-[350px] md:w-[450px] max-w-full flex-shrink-0 relative"
           >
              {renderItem ? renderItem(item, idx) : (
                 <div
                    className={cn(
                    "relative h-full rounded-2xl border px-8 py-6",
                    "border-slate-700 bg-slate-800"
                    )}
                >
                    <blockquote>
                    <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                        {item.quote}
                    </span>
                    <div className="relative z-20 mt-6 flex flex-row items-center">
                        <span className="flex flex-col gap-1">
                        <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                            {item.name}
                        </span>
                        <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                            {item.title}
                        </span>
                        </span>
                    </div>
                    </blockquote>
                </div>
              )}
           </li>
        ))}
      </ul>
    </div>
  );
};