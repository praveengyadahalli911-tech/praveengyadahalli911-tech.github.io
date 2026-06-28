"use client";

import { useState } from "react";

interface ExpandOnHoverProps {
  images: { src: string; alt: string }[];
}

const ExpandOnHover = ({ images }: ExpandOnHoverProps) => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full">
      <div className="relative flex w-full items-center justify-center p-2 transition-all duration-300 ease-in-out">
        <div className="w-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-1">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "24rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={img.src}
                      alt={img.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
