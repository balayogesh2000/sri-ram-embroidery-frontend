const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            Gandhiram
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 drop-shadow-md">
            Handcrafted Embroidered Handbags
          </p>
          <p className="mt-6 text-lg text-center text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            At Gandhiram, we specialize in creating one-of-a-kind embroidered
            handbags that blend elegance with tradition. Every piece is
            handcrafted with passion and care, showcasing the beauty of
            artisanal craftsmanship.
          </p>
          <a
            href="#gallery"
            className="mt-8 inline-block bg-blue-500 text-white font-medium px-8 py-4 rounded shadow-lg hover:bg-blue-600 transition duration-200"
          >
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
