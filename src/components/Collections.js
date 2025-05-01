"use client";

import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const {
          data: { collections },
        } = await api.collections.getAll();
        setCollections(collections);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <section id="collections" className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-10">Our Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {collections.length === 0 ? (
          <div>No collections found.</div>
        ) : (
          collections.map((collection, idx) => {
            const images = [];
            (collection.products || []).forEach((product) => {
              if (product.images?.length) {
                const img = product.images[0];
                images.push({
                  url: img.s3Location || "/placeholder.jpg",
                  alt: product.title || collection.name,
                  productId: product._id,
                  productTitle: product.title || "Product",
                });
              }
            });

            return (
              <Link
                key={collection.id || collection._id || idx}
                href={`/collections/${collection._id || collection.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
                prefetch={false}
              >
                <div className="p-5 border-b group-hover:bg-gray-50 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {collection.description}
                  </p>
                </div>
                <div className="relative w-full h-64 bg-gray-50">
                  {images.length > 0 ? (
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      modules={[Autoplay, Pagination]}
                      loop
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      className="h-full"
                    >
                      {images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative w-full h-64 flex items-center justify-center bg-white">
                            <Image
                              src={img.url}
                              alt={img.alt}
                              width={400}
                              height={300}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Image
                        src="/placeholder.jpg"
                        alt="No images"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover rounded-b-2xl"
                      />
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Collections;
