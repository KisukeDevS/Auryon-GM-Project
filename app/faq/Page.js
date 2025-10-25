"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
export default function Page() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-blue-500 to-blue-600 text-white flex flex-col items-center py-16 px-4 sm:px-12 ">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-bold mb-12 text-center"
      >
        Auryon Insights ✦
      </motion.h1>

      <div className="w-full max-w-3xl space-y-8">
        {/* ---------------- FAQ #1 ---------------- */}
        <motion.div
          layout
          onClick={() => toggle(1)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer shadow-lg overflow-hidden hover:border-white/30 transition-all duration-300 ${
            open === 1 ? "h-[30vh]" : "h-[10vh]"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold">
              What is Auryon and how does it work?
            </h2>
            <motion.span
              animate={{ rotate: open === 1 ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-2xl select-none"
            >
              +
            </motion.span>
          </div>

          {open === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 0.8,
              }}
              className="mt-4 text-gray-200 text-sm sm:text-base leading-relaxed"
            >
              Auryon is a platform built to fund creative and personal projects through aura-based support. Users can create profiles, connect with others, and receive contributions directly through their aura page. The system ensures authenticity, simplicity, and emotional value in every interaction.
            </motion.div>
          )}
        </motion.div>

        {/* ---------------- FAQ #2 ---------------- */}
        <motion.div
          layout
          onClick={() => toggle(2)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer shadow-lg overflow-hidden hover:border-white/30 transition-all duration-300 ${
            open === 2 ? "h-[26vh]" : "h-[10vh]"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold">
              How can I support someone’s aura?
            </h2>
            <motion.span
              animate={{ rotate: open === 2 ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-2xl select-none"
            >
              +
            </motion.span>
          </div>

          {open === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 23 }}
              className="mt-4 text-gray-200 text-sm sm:text-base leading-relaxed"
            >
              You can support someone by visiting their aura profile and choosing a contribution method. Whether it’s a one-time boost or a recurring aura stream, every act fuels their creative journey.
            </motion.div>
          )}
        </motion.div>
          
      </div>
      
      <h2 className = "font-bold text-lg font-mono">Wanna Read More about Auryon , check -:</h2>
      <Link href =  "/ReadmoreF" className = "border-white/10 hover:border-white/50 border-[0.5px]  p-3 bg-white/10 active:bg-black/10 cursor-pointer font-bold text-sm  rounded-lg backdrop-blur-md shadow-lg transition-all duration-200 ease-in-out mt-5">ReadMore 📖</Link>

    </div>
  );
}
