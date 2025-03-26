import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";

const ImageSlider = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} className="block">
      <div className="relative w-full h-60">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3 seconds
        >
          {product.images.length > 0 ? (
            product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-60">
                  <Image
                    src={img.s3Location || "/placeholder.jpg"}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="rounded-t-lg w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative w-full h-60">
                <Image
                  src="/placeholder.jpg"
                  alt="Placeholder"
                  width={400}
                  height={300}
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </Link>
  );
};

export default ImageSlider;
