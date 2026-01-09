"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CarouselItem {
    id: number;
    type: "content" | "image";
    image?: string;
    title?: string;
    subtitle?: string;
    mainText?: string;
    description?: string;
    tagline?: string;
    subTagline?: string;
}

const carouselItems: CarouselItem[] = [
    {
        id: 1,
        type: "image",
        image: "/certificates/contoh-sertifikat-penghargaanjp-20221226053158.jpg",
    },
    {
        id: 2,
        type: "image",
        image: "/certificates/Sertifikat Penghargaan Karyawan Paling Inovatif.webp",
    },
];

export default function LeadersCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoplay]);

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1
        );
        setAutoplay(false);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        setAutoplay(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setAutoplay(false);
    };

    const item = carouselItems[currentSlide];

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Carousel Container */}
            <div className="relative">
                {/* Slide */}
                <div className="rounded-2xl bg-white shadow-lg border-4 border-yellow-400 min-h-96 flex items-center justify-center overflow-hidden">
                    {item.type === "image" && item.image ? (
                        <div className="relative w-full h-96">
                            <Image
                                src={item.image}
                                alt={`Certificate ${item.id}`}
                                fill
                                className="object-contain p-4"
                                priority={currentSlide === item.id - 1}
                            />
                        </div>
                    ) : (
                        <div className="p-8 flex flex-col justify-center">
                            <h3 className="text-center text-2xl font-bold text-blue-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-center text-sm text-blue-800 mb-4">
                                {item.subtitle}
                            </p>
                            <div className="text-center text-2xl font-bold text-yellow-500 mb-2">
                                {item.mainText}
                            </div>
                            <p className="text-center text-xs text-gray-600 mb-6">
                                {item.description}
                            </p>

                            {/* Leaders Corner Box */}
                            <div className="mt-6 rounded-xl bg-white p-6 text-center shadow-md">
                                <div className="text-3xl font-bold text-blue-900">
                                    {item.tagline}
                                </div>
                                <div className="text-lg font-semibold text-gray-700">
                                    {item.subTagline}
                                </div>
                                <p className="mt-3 text-xs text-gray-500">
                                    Lebih dekat, lebih banyak belajar
                                </p>
                            </div>

                            <p className="mt-4 text-center text-xs text-gray-600">
                                saksikan selengkapnya hanya di {item.subTagline}
                            </p>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition ${index === currentSlide
                                ? "w-8 bg-blue-700"
                                : "w-3 bg-blue-300 hover:bg-blue-500"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-4 text-sm text-gray-600">
                {currentSlide + 1} / {carouselItems.length}
            </div>
        </div>
    );
}
