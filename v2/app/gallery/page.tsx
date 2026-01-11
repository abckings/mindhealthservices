"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function Gallery() {
  // There are 7 images in gallery1-images
  const images = Array.from({ length: 7 }, (_, i) => `/gallery1-images/${i + 1}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Note: In a real Next.js app, we would verify file existence at build time or use an API,
  // but for static export with client-side fallback (or just attempting to load),
  // we can just map them. However, `next/image` requires dimensions or valid paths.
  // If the file doesn't exist, it might break.
  // A safer way for this migration is to list the files I see in `v2/public/gallery1-images/`.

  // For now, I'll stick to a Client Component that renders images.
  // Handling 404 images in a static site loop is tricky without fs access at build time.
  // I'll assume 15 images for now.

  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="bg-brand-teal text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Gallery</h1>
          <p className="text-xl text-center text-brand-mint/80 mt-2">Moments and memories.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedImage(src)}
              >
                {/* We use a simple img tag for broader compatibility with unknown dimensions or potentially missing files,
                    though Next/Image is better. But with unknown dimensions, fill + object-cover is best. */}
                <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                        // Hide image if it fails to load (simple client-side fix for the loop issue)
                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                    }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-4 right-4 text-white hover:text-brand-sage transition">
                <X className="w-10 h-10" />
            </button>
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                    src={selectedImage}
                    alt="Enlarged view"
                    className="max-h-full max-w-full rounded-md shadow-2xl"
                />
            </div>
        </div>
      )}
    </div>
  );
}
