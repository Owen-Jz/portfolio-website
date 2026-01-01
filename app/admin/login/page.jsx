"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "../../libs/utils";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Access Denied: Invalid Credentials");
        // Shake animation triggering would happen here via state usually, 
        // but text change is enough for now.
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("System Error: Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-manrope selection:bg-[#b02222] selection:text-white">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#b02222]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[100px]" />
        
        {/* Abstract Grid Lines */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
                 backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                 backgroundSize: "50px 50px"
             }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Card Container */}
        <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-black relative group">
          
          {/* Top Decorative Line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#b02222] to-transparent opacity-50" />
          
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10 relative">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-[0_0_15px_rgba(176,34,34,0.1)]"
              >
                <ShieldCheck className="w-8 h-8 text-[#b02222]" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Restricted Access</h1>
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Identify Yourself</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Input */}
              <div className="space-y-2">
                <div className="relative group/input">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#b02222]' : 'text-white/30'}`} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#b02222]/50 focus:bg-black/60 transition-all font-mono text-sm"
                        placeholder="ADMIN_ID"
                    />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                 <div className="relative group/input">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#b02222]' : 'text-white/30'}`} />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#b02222]/50 focus:bg-black/60 transition-all font-mono text-sm"
                        placeholder="PASSPHRASE"
                    />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={`w-full relative group overflow-hidden rounded-xl py-4 font-bold tracking-wide transition-all duration-300 ${
                    loading 
                    ? "bg-[#b02222]/50 cursor-wait text-white/50" 
                    : "bg-[#b02222] hover:bg-[#c92e2e] text-white shadow-[0_0_20px_rgba(176,34,34,0.3)] hover:shadow-[0_0_30px_rgba(176,34,34,0.5)]"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>AUTHENTICATING...</span>
                        </>
                    ) : (
                        <>
                            <span>ENTER SYSTEM</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </div>
                
                {/* Shine Effect */}
                {!loading && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
                )}
              </motion.button>
            </form>
          </div>
          
          {/* Footer Status */}
          <div className="px-8 pb-8 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-[10px] text-white/30 font-mono tracking-wider">
                    {loading ? "ESTABLISHING CONNECTION..." : "SECURE GATEWAY V2.0"}
                </span>
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
