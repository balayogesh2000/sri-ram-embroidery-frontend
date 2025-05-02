"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CollectionCardSkeleton from "@/components/Collections/CollectionCardSkeleton";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import handleError from "@/utils/handleError";

const CollectionCard = ({ collection }) => {
  const images = (collection.products || []).map((product) => ({
    url: product.image?.s3Location || "/placeholder.jpg",
    alt: product.title || collection.name,
    productId: product._id,
    productTitle: product.title || "Product",
  }));

  return (
    <Link
      href={`/collections/${collection._id || collection.id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
      prefetch={false}
    >
      <div className="p-5 border-b group-hover:bg-gray-50 transition-colors">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {collection.name}
        </h3>
        <p className="text-gray-600 text-sm truncate">
          {collection.description}
        </p>
      </div>
      <div className="relative w-full h-64 bg-gray-50">
        {images.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay, Pagination]}
            className="h-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
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
              src="/images/placeholder.png"
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
};

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const { data } = await api.collections.getAll();
        setCollections(data.collections || []);
      } catch (err) {
        handleError(err);
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
            <CollectionCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="collections" className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-10">Our Collections</h2>
      {collections.length === 0 ? (
        <div className="text-center text-gray-500">No collections found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id || collection._id}
              collection={collection}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Collections;
