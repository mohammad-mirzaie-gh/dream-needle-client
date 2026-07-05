"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Thumbs, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { RiZoomOutLine } from "react-icons/ri";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const handleThumbClick = (image: string) => {
    setZoomedImage(image);
    setZoomed(true);
  };

  const closeZoom = () => {
    setZoomed(false);
  };

  useEffect(() => {
    if (mainSwiper) {
      const interval = setInterval(() => {
        if (!mainSwiper.destroyed) {
          mainSwiper.slideNext();
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mainSwiper]);

  return (
    <div className="product-gallery-container relative max-w-4xl mx-auto xl:w-[400px] w-[250px]">
      <div className="main-slider relative xl:h-[400px] mx-auto">
        <Swiper
          onSwiper={setMainSwiper}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Thumbs, Pagination]}
          // style={{height : "400px"}}
          className="main-swiper rounded-lg shadow-lg xl:w-[400px] w-[250px] xl:h-[400px] max-xl:h-[250px] z-10"
          pagination={{
            clickable: true,
            type: "bullets",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center w-[400px] h-[400px]">
              <Image
                width={750}
                height={750}
                src={image}
                alt={`Product ${index}`}
                className="main-image object-contain cursor-zoom-in rounded-md"
                onClick={() => handleThumbClick(image)}
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="thumbnail-gallery sm:mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={images.length > 4 ? 4 : images.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbnail-swiper max-sm:mt-[-20px]"
          breakpoints={{
            100: {
              slidesPerView: 3,
            },
            320: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: images.length > 4 ? 4 : images.length,
            }
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="!flex justify-center items-center z-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200">
                <Image
                  fill
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="object-cover"
                  onClick={() => handleThumbClick(image)}
                  quality={50}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {zoomed && zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeZoom}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              width={1200}
              height={1200}
              src={zoomedImage}
              alt="Zoomed product"
              className="zoomed-image object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="absolute top-4 right-4 bg-colorTheme p-2 rounded-full shadow-lg transition-colors"
              onClick={closeZoom}
              aria-label="Close zoom"
            >
              <RiZoomOutLine className="text-2xl text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;