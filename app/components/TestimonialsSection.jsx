"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { Quote } from "lucide-react";

// GlassCard Component (Local for now, could be shared)
const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-xl transition-all duration-500 ${
        hoverEffect
          ? "hover:border-white/20 hover:bg-[#151515]/70 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export function TestimonialsSection() {
  return (
<<<<<<< HEAD
    <div className="bg-transparent flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7">
=======
    <div className="py-24 relative overflow-hidden bg-[#0a0a0a]" id="testimonials">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <p className="text-[#b02222] text-sm md:text-base font-bold font-manrope uppercase tracking-widest mb-3">
>>>>>>> df230af (feat: Implement a comprehensive portfolio website with blog, admin panel, project pages, and various UI components.)
          Testimonials
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-bold font-manrope leading-tight">
          What My Clients Say
        </h2>
      </div>
      
      <div className="relative z-10">
        <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            renderItem={(item, idx) => (
            <GlassCard 
                key={idx} 
                className="w-[350px] md:w-[450px] p-8 h-full flex flex-col justify-between"
                hoverEffect={true}
            >
                <div>
                <Quote className="text-[#b02222] w-8 h-8 mb-6 opacity-80" />
                <p className="text-white/80 text-lg md:text-xl font-manrope leading-relaxed mb-8">
                    "{item.quote}"
                </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="relative">
                    <img
                    src={item.picture}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#151515] rounded-full p-0.5 border border-white/10">
                         <img
                            src={item.nationality}
                            alt="Nationality"
                            className="w-4 h-3 object-cover rounded-[2px]"
                            loading="lazy"
                        />
                    </div>
                </div>
                
                <div>
                    <h4 className="text-white font-bold font-manrope text-base">
                    {item.name}
                    </h4>
                    <p className="text-white/50 text-sm font-manrope">
                    {item.role}
                    </p>
                </div>
                </div>
            </GlassCard>
            )}
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The e-commerce platform redesign was a game-changer, delivering a modern and seamless shopping experience.",
    name: "Torti Ama-Njoku",
    role: "Founder, ShopTrend",
    picture: "/profiles/torti.png",
    nationality: "/flags/Canada.png",
  },
  {
    quote:
      "Owen is a very diverse creative who brings innovation to whatever he does. His personality and approach to problem solving is impeccable. I recommend him for his brilliant and innovative approach.",
    name: "IB Douglas",
    role: "CEO, Probitek",
    picture: "/profiles/ib.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Working with Owen was a breath of fresh air. He communicated well, was upfront, and most importantly, delivered on time. What I perhaps liked most about working with Owen was how he took us through the entire design process. From conception to completion, we had a say in every step — and in the end, this greatly contributed to the perfect product he delivered. I highly recommend him.",
    name: "Mr Moithuti",
    role: "CEO, Moithuti",
    picture: "/profiles/moithuti.png",
    nationality: "/flags/Botswana.png",
  },
  {
    quote:
      "Working with Owen was an amazing experience! He was a true team player throughout our brand project bringing creativity, collaboration, and a strong work ethic. His positive attitude and commitment made a real impact. I’d gladly work with him again!",
    name: "Nnene Bright-Victor",
    role: "CEO, NenysTouchs",
    picture: "/profiles/nnene.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Fantastic job on Carb’s brand identity — the visuals are stunning and clearly communicate our vision. Highly recommended!",
    name: "Victor Aghaji",
    role: "CEO, Carb",
    picture: "/profiles/carb.png",
    nationality: "/flags/Nigeria.png",
  },
];
