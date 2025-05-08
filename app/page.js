import Navbar from "./components/navbar";

import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161513]">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
