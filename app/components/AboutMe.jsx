import React from "react";

const ToolLogo = ({ src, alt = "Tool Logo" }) => {
  return (
    <div className="border border-gray-700 h-20 w-20 rounded-2xl flex items-center justify-center bg-black/20">
      <img src={src} alt={alt} className="w-10 h-10 object-contain" />
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="py-8 ">
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px] flex flex-col lg:flex-row items-center lg:items-start justify-center ">
        {/* First Column */}
        <div className="space-y-6 md:space-y-8 flex flex-col w-full lg:w-1/3 flex-shrink-0">
          {/* Introduction */}
          <div className="flex flex-col space-y-3 w-full max-w-[375px] mx-auto">
            <p className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7">
              Beyond Portfolio
            </p>
            <h2 className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] leading-tight">
              Let's know more about me
            </h2>
          </div>

          {/* Workspace */}
          <div className="flex flex-col space-y-4 rounded-3xl p-6 w-full max-w-[375px] mx-auto relative overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300 bg-black/30">
            <div className="absolute -left-14 -top-36 w-32 h-56 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[150px]" />
            <div className="flex flex-row items-center space-x-3 z-10">
              <img src="/Icon.svg" alt="Logo" className="w-8 h-8" />
              <h3 className="text-white text-xl md:text-2xl font-semibold font-['Manrope']">
                My Workspace
              </h3>
            </div>
            <p className="text-[#afafaf] text-base md:text-lg leading-relaxed z-10 px-2">
              Most of my remote work is done here.
            </p>
            <div className="flex justify-center w-full">
              <img
                className="w-full max-w-[260px] h-auto rounded-[20px] z-10 object-cover"
                src="/Workspace.png"
                alt="Workspace"
              />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-6 flex flex-col w-full lg:w-1/3 mt-6 lg:mt-0 flex-shrink-0">
          {/* My Stack */}
          <div className="flex flex-col space-y-4 rounded-3xl p-6 w-full max-w-[375px] mx-auto relative overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300 bg-black/30">
            <div className="absolute -left-14 -top-36 w-32 h-56 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[150px]" />
            <div className="flex flex-row items-center space-x-3 z-10">
              <img src="/Icon.svg" alt="Logo" className="w-8 h-8" />
              <h3 className="text-white text-xl md:text-2xl font-semibold font-['Manrope']">
                My Stack
              </h3>
            </div>
            <p className="text-[#afafaf] text-base md:text-lg leading-relaxed z-10 px-2">
              Tools that I use to carry out my design process for efficient
              workflow
            </p>
            <div className="space-y-4 z-10 flex flex-col items-center mt-2">
              <div className="flex flex-row space-x-4 justify-center">
                <ToolLogo src="/ToolLogo1.svg" alt="Illustrator" />
                <ToolLogo src="/IDC.svg" alt="Next.js" />
                <ToolLogo src="/Webflow.svg" alt="Webflow" />
              </div>
              <div className="flex flex-row space-x-4 justify-center">
                <ToolLogo src="/Photoshop.svg" alt="Photoshop" />
                <ToolLogo src="/Figma.svg" alt="Figma" />
                <ToolLogo src="/Python.svg" alt="Python" />
              </div>
            </div>
          </div>

          {/* Best Quote */}
          <div className="hidden md:flex flex-col space-y-3 rounded-3xl px-6 py-6 w-full max-w-[375px] mx-auto relative overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300 bg-black/30">
            <div className="absolute -left-14 -top-36 w-32 h-56 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[150px]" />
            <div className="text-white text-lg md:text-xl font-extrabold font-['Manrope'] z-10">
              Best Quote
            </div>
            <div className="text-white text-base md:text-lg font-semibold font-['Manrope'] z-10">
              "Good design is as little design as possible."
            </div>
            <div className="text-white text-base md:text-lg font-normal font-serif z-10">
              — Dieter Rams
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="space-y-6 flex flex-col w-full lg:w-1/3 mt-6 lg:mt-0 flex-shrink-0">
          {/* My Location */}
          <div className="w-full max-w-[375px] mx-auto">
            <img
              src="/MyLocation.png"
              alt="My Location"
              className="hidden md:block w-full h-auto aspect-[16/9] object-cover border border-gray-700 rounded-3xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* My Persona */}
          <div className="w-full max-w-[375px] mx-auto mt-6 md:mt-0">
            <div className="relative h-auto min-h-[320px] w-full bg-black/30 rounded-3xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300 p-6">
              <div className="absolute -left-14 -top-36 w-32 h-56 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-[150px]" />
              <div className="flex flex-col gap-3 z-10 relative">
                <div className="flex gap-3 items-center">
                  <img src="/Icon.svg" alt="Logo" className="w-8 h-8" />
                  <div className="text-white text-xl md:text-2xl font-semibold font-['Manrope']">
                    My Persona
                  </div>
                </div>
                <p className="text-white/50 text-base md:text-lg font-normal leading-relaxed mb-8">
                  Basically, things I enjoy doing!
                </p>
              </div>
              {[
                {
                  text: "Introvert💻",
                  rotate: "-15deg",
                  left: "50%",
                  top: "160px",
                },
                {
                  text: "Dancer🕺",
                  rotate: "-10deg",
                  left: "20%",
                  top: "220px",
                },
                {
                  text: "Artist🎨",
                  rotate: "5deg",
                  left: "65%",
                  top: "210px",
                },
                {
                  text: "Gamer🎮",
                  rotate: "-20deg",
                  left: "10%",
                  top: "180px",
                },
              ].map(({ text, rotate, left, top }, index) => (
                <div
                  key={index}
                  className="absolute px-6 py-2 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full text-[#151515] text-sm md:text-base font-semibold font-['Manrope'] z-10 whitespace-nowrap"
                  style={{
                    transform: `rotate(${rotate})`,
                    left,
                    top,
                    transformOrigin: "center",
                  }}
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
