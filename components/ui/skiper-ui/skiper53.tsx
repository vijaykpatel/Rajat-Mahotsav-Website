"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";
import { getCloudflareImageBiggest } from "@/lib/cdn-assets";

interface SkiperImage {
  src: string;
  alt: string;
}

interface Skiper53Props {
  images?: SkiperImage[];
  className?: string;
  fullscreen?: boolean;
}

const defaultImages: SkiperImage[] = [
  {
    src: getCloudflareImageBiggest("1443ce4a-1e60-4a83-34d8-f8626fe74b00"),
    alt: "Lord Shree Swaminarayan",
  },
  {
    src: getCloudflareImageBiggest("9dbe17dd-7e0b-49d1-984f-f8a4f20cd000"),
    alt: "Festival lights",
  },
  {
    src: getCloudflareImageBiggest("f3dcd6de-5334-48d0-c950-8d35e3f32f00"),
    alt: "Cultural celebration",
  },
  {
    src: getCloudflareImageBiggest("9b13ec59-9484-4191-00db-04b31cda2a00"),
    alt: "Temple architecture",
  },
  {
    src: getCloudflareImageBiggest("6369e804-64ef-42fe-2bd7-ece677d9f200"),
    alt: "Prayer ceremony",
  },
  {
    src: getCloudflareImageBiggest("8e64636f-efca-468f-44a0-1004f7f7a600"),
    alt: "Devotional gathering",
  },
  {
    src: getCloudflareImageBiggest("b7366436-526c-437a-bf1b-6bae9cec4a00"),
    alt: "Sacred ceremony",
  },
  {
    src: getCloudflareImageBiggest("24e09951-0339-4eb7-b452-02aa945d2600"),
    alt: "Community event",
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
