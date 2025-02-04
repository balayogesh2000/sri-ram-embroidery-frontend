"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative text-center px-6"
      >
        <h1 className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Gandhiram
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-300 drop-shadow-md">
          Handcrafted Embroidered Handbags
        </p>
        <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
          At <span className="text-white font-semibold">Gandhiram</span>, we
          specialize in creating one-of-a-kind embroidered handbags that blend
          elegance with tradition. Every piece is handcrafted with passion and
          care, showcasing the beauty of artisanal craftsmanship.
        </p>
        <motion.a
          href="#gallery"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-blue-500 text-white font-medium px-8 py-4 rounded-lg shadow-xl hover:bg-blue-600 transition duration-300 hover:shadow-blue-500/50"
        >
          Explore Collections
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
