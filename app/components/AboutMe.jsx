'use client'
import React, { useRef, useEffect } from "react";

const ToolLogo = ({ src, alt = "Tool Logo" }) => {
  return (
    <div className="border-[1.394px] border-solid border-[rgba(255,255,255,0.20)] h-[84px] w-[84px] rounded-2xl flex items-center justify-center">
      <img src={src} alt={alt} className="w-[40px] h-[40px]" />
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="py-8">
      <div className="mx-4 sm:mx-6 lg:mx-auto max-w-[1400px] lg:flex flex-row items-start justify-center space-y-6 lg:space-y-0 lg:space-x-[33px]">
        {/* First Column */}
        <div className="space-y-8 md:space-y-[57px] flex flex-col">
          {/* Introduction */}
          <div className="flex flex-col space-y-[11.5px] w-full max-w-[375px] mx-auto lg:mx-0">
            <p className="text-[#b02222] text-[21.98px] font-bold font-['Manrope'] uppercase leading-7">
              Beyond Portfolio
            </p>
            <h2 className="text-white text-[43.96px] font-normal font-['Manrope'] leading-[52.98px]">
              Let’s know more about me
            </h2>
          </div>

          {/* Workspace */}
          <div className="flex flex-col space-y-[11.5px] rounded-3xl items-center py-4 w-full max-w-[375px] mx-auto lg:mx-0 min-h-[380px] relative overflow-hidden border border-gray-600">
            <div className="absolute -left-14 -top-36 w-[133.63px] h-[225.88px] bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[153.59px]" />
            <div className="flex flex-row items-center space-x-3 z-10">
              <img src="/Icon.svg" alt="Logo" className="w-[35px] h-[34px]" />
              <h3 className="text-white text-[22px] font-semibold">
                My Workspace
              </h3>
            </div>
            <p className="w-full max-w-[319.30px] text-[#afafaf] text-base sm:text-lg leading-[25.10px] text-center z-10 px-4">
              Most of my remote work is done here.
            </p>
            <img
              className="w-[257px] h-[254px] rounded-[20px] z-10"
              src="/Workspace.png"
              alt="Workspace"
            />
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-6 md:space-y-[33px] flex flex-col">
          {/* My Stack */}
          <div className="flex flex-col space-y-[11.5px] rounded-3xl items-center py-4 w-full max-w-[375px] mx-auto lg:mx-0 min-h-[402px] justify-center relative overflow-hidden border border-gray-600">
            <div className="absolute -left-14 -top-36 w-[133.63px] h-[225.88px] bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[153.59px]" />
            <div className="flex flex-row items-center space-x-3 z-10">
              <img src="/Icon.svg" alt="Logo" className="w-[35px] h-[34px]" />
              <h3 className="text-white text-[22px] font-semibold leading-[33px]">
                My Stack
              </h3>
            </div>
            <p className="w-full max-w-[319.30px] text-[#afafaf] text-base sm:text-lg leading-[25.10px] text-center z-10 px-4">
              Tools that I use to carry out my design process for efficient
              workflow
            </p>
            <div className="space-y-[15px] z-10">
              <div className="flex flex-row space-x-[15px] justify-center">
                <ToolLogo src="/ToolLogo1.svg" alt="Illustrator" />
                <ToolLogo src="/Nextjs.svg" alt="Next.js" />
                <ToolLogo src="/Webflow.svg" alt="Webflow" />
              </div>
              <div className="flex flex-row space-x-[15px] justify-center">
                <ToolLogo src="/Photoshop.svg" alt="Photoshop" />
                <ToolLogo src="/Figma.svg" alt="Figma" />
                <ToolLogo src="/Python.svg" alt="Python" />
              </div>
            </div>
          </div>

          {/* Best Quote */}
          <div className="hidden md:flex lg:flex flex-col space-y-[11.5px] rounded-3xl px-10 py-4 w-full max-w-[375px] mx-auto lg:mx-0 h-[154px] relative overflow-hidden border border-gray-600">
            <div className="absolute -left-14 -top-36 w-[133.63px] h-[225.88px] bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[153.59px]" />
            <div className="text-white text-lg font-extrabold font-['Manrope'] leading-[33.46px] z-10">
              Best Quote
            </div>
            <div className="text-white text-sm font-semibold font-['Manrope'] leading-[33.46px] z-10">
              "Good design is as little design as possible."
            </div>
            <div className="text-white text-sm font-normal font-serif leading-[33.46px] z-10">
              — Dieter Rams
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="space-y-6 md:space-y-[33px] flex flex-col">
          {/* My Location */}
          <div className="w-full max-w-[375px] mx-auto lg:mx-0">
            <img
              src="/MyLocation.png"
              alt="My Location"
              className="hidden md:block lg:h-[218px] w-full border border-gray-600 rounded-3xl"
            />
          </div>

          {/* My Persona */}
          <div className="w-full max-w-[375px] mx-auto lg:mx-0">
            <div className="relative h-[337.36px] w-full bg-black/10 rounded-[19.46px] overflow-hidden border border-gray-600">
              <div className="absolute -left-14 -top-36 w-[133.63px] h-[225.88px] bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[153.59px]" />
              <div className="absolute left-7 top-8 flex flex-col gap-[11.15px] z-10">
                <div className="flex gap-[11.15px]">
                  <img
                    src="/Icon.svg"
                    alt="Logo"
                    className="w-[35px] h-[34px]"
                  />
                  <div className="text-white text-[21.98px] font-semibold leading-[33.46px]">
                    My Persona
                  </div>
                </div>
                <p className="w-full max-w-[319.3px] text-white/50 text-base sm:text-lg font-normal leading-[25.10px]">
                  Basically, things I enjoy doing!
                </p>
              </div>
              {[
                {
                  text: "Introvert💻",
                  rotate: "-15.85deg",
                  left: "clamp(100px, 50%, 182.81px)",
                  top: "165.59px",
                },
                {
                  text: "Dancer🕺",
                  rotate: "-9.67deg",
                  left: "clamp(40px, 20%, 61.35px)",
                  top: "249.57px",
                },
                {
                  text: "Artist🎨",
                  rotate: "4.73deg",
                  left: "clamp(120px, 60%, 214.73px)",
                  top: "224.49px",
                },
                {
                  text: "Gamer🎮",
                  rotate: "-23.79deg",
                  left: "clamp(0px, 0%, 1.88px)",
                  top: "208.82px",
                },
              ].map(({ text, rotate, left, top }, index) => (
                <div
                  key={index}
                  className="absolute px-[30.68px] py-2 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-[46.01px] text-[#151515] text-[15px] font-semibold font-['Manrope'] leading-[33.46px] z-10"
                  style={{ transform: `rotate(${rotate})`, left, top }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
