
import React from "react";

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-md md:backdrop-blur-xl transition-all duration-500 ${hoverEffect
          ? "hover:border-white/20 hover:bg-[#151515]/70 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-1"
          : ""
        } ${className}`}
    >
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/20 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GlassCard;
