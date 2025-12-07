"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";

interface SkiperImage {
  src: string;
  alt: string;
  code: string;
}

interface Skiper53Props {
  images?: SkiperImage[];
  className?: string;
  fullscreen?: boolean;
}

const defaultImages: SkiperImage[] = [
  {
    src: "https://images.unsplash.com/photo-1604608672516-f1b9b1a2b6e0?w=800&h=600&fit=crop",
    alt: "Temple celebration",
    code: "# 01",
  },
  {
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
    alt: "Festival lights",
    code: "# 02",
  },
  {
    src: "https://images.unsplash.com/photo-1609619385002-f40f1df827eb?w=800&h=600&fit=crop",
    alt: "Cultural celebration",
    code: "# 03",
  },
  {
    src: "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?w=800&h=600&fit=crop",
    alt: "Temple architecture",
    code: "# 04",
  },
  {
    src: "https://images.unsplash.com/photo-1590766940554-634f9d8c8f3f?w=800&h=600&fit=crop",
    alt: "Prayer ceremony",
    code: "# 05",
  },
  {
    src: "https://images.unsplash.com/photo-1623944889288-cd147dbb517c?w=800&h=600&fit=crop",
    alt: "Devotional gathering",
    code: "# 06",
  },
  {
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=600&fit=crop",
    alt: "Sacred ceremony",
    code: "# 07",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Community event",
    code: "# 08",
  },
];

const Skiper53 = ({ images = defaultImages, className, fullscreen = false }: Skiper53Props) => {
  return (
    <div className={cn(
      "flex items-center justify-center overflow-hidden",
      fullscreen ? "absolute inset-0 w-full h-full" : "h-full w-full",
      className
    )}>
      <HoverExpand_002 className="" images={images} fullscreen={fullscreen} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
  fullscreen = false,
}: {
  images: SkiperImage[];
  className?: string;
  fullscreen?: boolean;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(3);
  const imageCount = images.length;
  // Base width for each image (100% / imageCount)
  const baseWidth = 100 / imageCount;
  // When one expands, others shrink to make room
  const expandedWidth = 40;
  const shrunkWidth = (100 - expandedWidth) / (imageCount - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
      }}
      className={cn(
        "relative w-full",
        fullscreen ? "h-full" : "max-w-6xl px-5",
        className
      )}
    >
      <div className={cn(
        "flex w-full items-stretch",
        fullscreen ? "h-full gap-0" : "flex-col gap-1"
      )}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer overflow-hidden flex-shrink-0"
            style={fullscreen ? { height: "100%" } : undefined}
            initial={fullscreen
              ? { width: `${baseWidth}%` }
              : { height: "2.5rem", width: "100%" }
            }
            animate={fullscreen
              ? { width: activeImage === index ? `${expandedWidth}%` : `${shrunkWidth}%` }
              : { height: activeImage === index ? "24rem" : "2.5rem" }
            }
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute flex h-full w-full flex-col items-end justify-end px-6 pb-8 z-20"
                >
                  <p className="text-left text-sm font-medium text-white/70">
                    {image.alt}
                  </p>
                  <p className="text-left text-xs text-white/40 mt-1">
                    {image.code}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={image.src}
              className="size-full object-cover"
              alt={image.alt}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export { HoverExpand_002 };
