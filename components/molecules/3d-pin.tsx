"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { MapPin, Copy, Check } from "lucide-react";


export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [mobileAnimated, setMobileAnimated] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile && isInView && !mobileAnimated) {
      timerRef.current = setTimeout(() => {
        setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.85)");
        setMobileAnimated(true);
        setShowPin(true);
      }, 1000);
    } else if (isMobile && !isInView) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
      setMobileAnimated(false);
      setShowPin(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isMobile, isInView, mobileAnimated]);

  const onMouseEnter = () => {
    if (!isMobile) {
      setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.85)");
      setShowPin(true);
    }
  };
  const onMouseLeave = () => {
    if (!isMobile) {
      setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
      setShowPin(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 cursor-pointer w-full",
        showPin && "group/pin",
        containerClassName
      )}
      style={{ maxWidth: isMobile ? "100%" : "52rem", height: isMobile ? "auto" : "37rem", padding: isMobile ? "0" : "1rem", margin: "0 auto" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-white border-2 border-orange-200 group-hover/pin:border-orange-300 transition-all duration-500 overflow-hidden pointer-events-auto p-6 w-[calc(100vw-2rem)] max-w-[50rem]"
        >
          <div className={cn(" relative z-50 w-full", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} showPin={showPin} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
  showPin,
}: {
  title?: string;
  href?: string;
  showPin: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('200 Swamibapa Way, Secaucus, NJ 07094');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div className={cn("pointer-events-none w-96 h-80 flex items-center justify-center z-[60] transition-opacity duration-700", showPin ? "opacity-100" : "opacity-0")}>
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-orange-500 py-2 pl-6 pr-3 ring-2 ring-orange-300 shadow-lg shadow-orange-500/50 pointer-events-auto">
            <a
              href="https://maps.app.goo.gl/oug55PMrZWvMJ9UX6"
              target="_blank"
              className="flex items-center space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
              <MapPin className="h-5 w-5 text-white" />
              <span className="relative z-20 text-white text-base font-bold inline-block">
                {title}
              </span>
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title="Copy address"
            >
              {copied ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Copy className="h-4 w-4 text-white" />
              )}
            </button>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-300/0 via-orange-300/90 to-orange-300/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-orange-500/[0.25] shadow-[0_8px_16px_rgb(249_115_22/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-orange-500/[0.25] shadow-[0_8px_16px_rgb(249_115_22/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-orange-500/[0.25] shadow-[0_8px_16px_rgb(249_115_22/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent via-orange-500/80 to-orange-500 translate-y-[14px] w-[4px] h-24 group-hover/pin:h-48 blur-[3px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent via-orange-500/80 to-orange-500 translate-y-[14px] w-[4px] h-24 group-hover/pin:h-48  " />
          <motion.div className="absolute right-1/2 translate-x-[2px] bottom-1/2 bg-orange-600 translate-y-[14px] w-[8px] h-[8px] rounded-full z-40 blur-[4px]" />
          <motion.div className="absolute right-1/2 translate-x-[1px] bottom-1/2 bg-orange-400 translate-y-[14px] w-[6px] h-[6px] rounded-full z-40 " />
        </>
      </div>
    </motion.div>
  );
};
