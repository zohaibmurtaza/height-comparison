"use client";
import { GOOGLE_AD_CLIENT } from "@/misc/data";
import { cn } from "@/utils/className";
import { useEffect } from "react";

type AdSenseAdProps = {
  slot: string;
  format: string;
  responsive: boolean;
  className?: string;
};

type WindowObject = Window & typeof globalThis & { adsbygoogle: object[] };

const AdsenseUnit = ({
  slot,
  format,
  responsive,
  className = "",
}: AdSenseAdProps) => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      try {
        ((window as WindowObject).adsbygoogle =
          (window as WindowObject).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <ins
      className={`adsbygoogle ${cn("block", className)}`}
      data-ad-client={GOOGLE_AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};

export default AdsenseUnit;
