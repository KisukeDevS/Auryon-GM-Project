"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07102a] via-[#26184f] to-[#07102a] flex items-center justify-center p-8">
      <motion.div
        className="max-w-3xl w-full bg-[#0F111A]/70 rounded-2xl p-8 backdrop-blur-md border border-white/6 shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#63D0FF] to-[#B36BFF]">
          Support
        </h1>

        <p className="text-gray-300 mb-6">
          Need help? Reach out — we try to respond within 24–48 hours. For urgent payment issues, include transaction ID and screenshot when possible.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none"
          />
          <textarea
            placeholder="How can we help?"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none h-32"
          />
          <button
            type="button"
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#0077FF] to-[#A65BFF] font-semibold"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          For faster answers, check the <Link href="/faq" className="text-blue-300 underline">FAQ</Link> or the <Link href="/ReadMoreF" className="text-blue-300 underline">blog</Link>.
        </div>
      </motion.div>
    </div>
  );
}
