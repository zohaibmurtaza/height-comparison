import React from "react";
import AdsenseUnit from "./google-ads/AdsenseUnit";

const StickyFooter = () => {
  return (
    <div className="w-full h-[100px] bg-white/80 border-t border-gray-100 z-[99999]">
      <AdsenseUnit slot="2400450591" format="auto" responsive={true} />
    </div>
  );
};

export default StickyFooter;
