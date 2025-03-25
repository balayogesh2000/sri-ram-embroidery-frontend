"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Darker Gradient Overlay for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/60"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl shadow-black">
          Sri ram
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-gray-300 drop-shadow-lg">
          Handcrafted Luxury Handbags
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
          <span className="text-white font-semibold">Sri ram</span> creates
          exquisite, hand-embroidered handbags that combine artistry and
          tradition.
        </p>
        <motion.a
          href="#gallery"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
        >
          Explore Collections
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
