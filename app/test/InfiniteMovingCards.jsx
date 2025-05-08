"use client";

import { cn } from "../libs/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, [items]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      while (scrollerRef.current.children.length > items.length) {
        scrollerRef.current.removeChild(scrollerRef.current.lastChild);
      }

      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
          animation-direction: var(--animation-direction);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-[350px] max-w-full shrink-0 rounded-2xl border px-6 py-10 md:w-[450px]",
              "border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)]",
              "dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)] backdrop-blur-sm"
            )}
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
              <div className="relative z-20 mt-4 flex flex-row items-center gap-3">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-600"
                  loading="lazy"
                />
                <span className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm leading-[1.6] font-semibold text-neutral-800 dark:text-white">
                      {item.name}
                    </span>
                    <img
                      src={item.nationality}
                      alt={`${item.name}'s nationality flag`}
                      className="w-6 h-4 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.role}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
