"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function Page() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="min-h-screen w-screen bg-[#0F111A] text-white flex flex-col items-center justify-center px-6 py-16"
    >
      <motion.h1
        variants={fadeUp}
        className="text-4xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-6"
      >
        About Auryon
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-3xl text-center text-gray-300 leading-relaxed text-[17px] sm:text-[18px]"
      >
        Auryon is a creative platform built to fund and empower individuals through their unique aura.
        It allows users to connect, discover, and support one another in a space where passion meets purpose.
        <br /><br />
        Our goal is to redefine how digital trust and support work. Whether you’re an artist, creator, or supporter,
        Auryon gives you tools to grow your personal aura and share it with the world.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-24 opacity-100 ">
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-bold font-mono opacity-100 hover:from-purple-500/80 hover:via-pink-500/80 hover:to-blue-500/80 transition-transform "
        >
          <span className = "pointer-events-none">Back to Home</span>
        </Link>
      </motion.div>

      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, scale: 1.2 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"
      ></motion.div>
    </motion.main>
  );
}

// Disable SSR for this component
export default dynamic(() => Promise.resolve(Page), { ssr: false });
