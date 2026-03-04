"use client";
import React from "react";
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Target, Terminal, Quote, User } from "lucide-react";

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-xl transition-all duration-500 group/card ${hoverEffect
        ? "hover:border-white/20 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-1"
        : ""
        } ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(176, 34, 34, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const ToolLogo = ({ src, alt, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(176,34,34,0.3)",
        borderColor: "rgba(255,255,255,0.3)"
      }}
      className="group relative flex flex-col items-center justify-center h-[100px] w-full rounded-2xl bg-white/5 border border-white/10 transition-colors cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#b02222]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />

      <motion.img
        src={src}
        alt={alt}
        className="w-10 h-10 object-contain relative z-10 opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />

      <span className="absolute bottom-2 text-[10px] font-mono text-white/80 uppercase tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {alt}
      </span>
    </motion.div>
  );
};

const SolutionCard = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#b02222]/40 transition-all"
  >
    <h4 className="text-[#b02222] font-bold text-sm mb-1 uppercase tracking-tighter">{title}</h4>
    <p className="text-white/50 text-xs leading-relaxed">{description}</p>
  </motion.div>
);

const StatusBadge = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </div>
    <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Available for work</span>
  </div>
);

const Badge = ({ constraintsRef, text, rotate, left, top, delay }) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
    style={{ left, top, rotate }}
    className="absolute cursor-grab active:cursor-grabbing px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-lg"
    whileHover={{ scale: 1.1, zIndex: 30 }}
    whileDrag={{ scale: 1.1, zIndex: 40 }}
  >
    <span className="text-white/90 text-sm font-medium whitespace-nowrap">{text}</span>
  </motion.div>
);

const AboutMe = () => {
  const constraintsRef = React.useRef(null);

  return (
    <div className="py-20 relative">
      {/* Background glow for the entire section */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-4 sm:mx-6 lg:mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* First Column (Left) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          {/* Introduction Header */}
          <div className="flex flex-col gap-3 py-4 lg:py-0 justify-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#b02222] font-bold font-manrope uppercase tracking-wider text-sm lg:text-base"
            >
              Strategic Design Engineering
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-white text-4xl lg:text-5xl font-manrope font-semibold leading-tight"
            >
              Solving complex <br className="hidden lg:block" /> problems through <br className="hidden lg:block" /> elite engineering.
            </motion.h2>
          </div>

          {/* Solutions Card */}
          <GlassCard className="p-6 md:p-8 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/5 rounded-lg">
                <Target className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-white text-xl font-semibold font-manrope">
                Solutions
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <SolutionCard
                title="Revenue-Optimized Web Apps"
                description="Engineered for high conversion, global scalability, and sub-second performance."
                delay={0.1}
              />
              <SolutionCard
                title="Autonomous System Design"
                description="Bridging AI logic with visual interfaces to reclaim operational efficiency."
                delay={0.2}
              />
              <SolutionCard
                title="Enterprise Design Systems"
                description="Robust, documented UI infrastructure designed to govern brand excellence at scale."
                delay={0.3}
              />
            </div>
          </GlassCard>
        </div>

        {/* Second Column (Middle) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          {/* My Stack Card: Fixed large height, but lets column stretch */}
          <GlassCard className="p-6 md:p-8 flex flex-col min-h-[480px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/5 rounded-lg">
                <Terminal className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-white text-xl font-semibold font-manrope">
                Tech Arsenal
              </h3>
            </div>

            <p className="text-white/60 font-manrope text-base mb-8 leading-relaxed">
              Tools that empower my workflow and bring ideas to life.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mx-auto w-full">
              {[
                { src: "/ToolLogo1.svg", alt: "Illustrator" },
                { src: "/Nextjs.svg", alt: "Next.js" },
                { src: "/Webflow.svg", alt: "Webflow" },
                { src: "/Photoshop.svg", alt: "Photoshop" },
                { src: "/Figma.svg", alt: "Figma" },
                { src: "/Python.svg", alt: "Python" }
              ].map((tool, index) => (
                <ToolLogo
                  key={tool.alt}
                  src={tool.src}
                  alt={tool.alt}
                  delay={0.1 + (index * 0.1)}
                />
              ))}
            </div>

            <div className="mt-auto pt-8 text-center relative z-10">
              <StatusBadge />
            </div>
          </GlassCard>

          {/* Quote Card: Fills remaining space */}
          <GlassCard className="p-6 md:p-8 flex flex-col min-h-[200px] flex-1" hoverEffect={true}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/5 rounded-lg">
                <Quote className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-white text-xl font-semibold font-manrope">
                Favorite Quote
              </h3>
            </div>

            <div className="flex-1 flex flex-col justify-center relative">
              <div className="absolute right-4 -top-2 text-[#b02222]/10 text-9xl font-serif leading-none select-none">”</div>
              <blockquote className="text-white text-xl font-medium font-manrope leading-relaxed relative z-10">
                "Good design is as little design as possible."
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#b02222]"></div>
                <span className="text-white/60 text-sm font-mono uppercase tracking-widest">Dieter Rams</span>
              </footer>
            </div>
          </GlassCard>
        </div>

        {/* Third Column (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          {/* Location Card: Fixed height */}
          <GlassCard className="p-2 h-[280px] group flex-none">
            <div className="w-full h-full rounded-[18px] overflow-hidden relative">
              <img
                src="/MyLocation.png"
                alt="Location"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-xs font-mono">Based in Earth</span>
              </div>
            </div>
          </GlassCard>

          {/* Persona Card: Fills remaining space */}
          <GlassCard className="min-h-[400px] relative overflow-hidden flex-1">
            <div ref={constraintsRef} className="absolute inset-0 z-0" /> {/* Constraints container */}
            <div className="p-6 md:p-8 relative z-10 pointer-events-none"> {/* Text content shouldn't block drags, but we need text to separate? actually pointer-events-none on container is safer, text can retain pointer-events-auto if needed. */}
              <div className="flex items-center gap-3 mb-2 pointer-events-auto">
                <div className="p-2 bg-white/5 rounded-lg">
                  <User className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="text-white text-xl font-semibold font-manrope">
                  Persona
                </h3>
              </div>
              <p className="text-white/60 font-manrope text-sm pointer-events-auto">
                The facets that make me, me.
              </p>
            </div>

            {/* Floating Badges Area */}
            <div className="absolute inset-0 top-20 z-20">
              <Badge constraintsRef={constraintsRef} text="Introvert 💻" rotate="-12deg" left="55%" top="20%" delay={0.1} />
              <Badge constraintsRef={constraintsRef} text="Dancer 🕺" rotate="-5deg" left="15%" top="45%" delay={0.2} />
              <Badge constraintsRef={constraintsRef} text="Artist 🎨" rotate="8deg" left="60%" top="55%" delay={0.3} />
              <Badge constraintsRef={constraintsRef} text="Gamer 🎮" rotate="-15deg" left="10%" top="20%" delay={0.4} />
              <Badge constraintsRef={constraintsRef} text="Dreamer 🌙" rotate="12deg" left="35%" top="70%" delay={0.5} />
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;

