import Image from "next/image";
import React from "react";

interface ProductImagesProps {
  images?: string;
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [mainImage, ...otherImages] = images ?? [];

  return (
    <div className="flex flex-col gap-4  bg-gray-100">
      <div className="relative aspect-square">
        {mainImage ? (
          <Image
            src={mainImage}
            alt="Product main image"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {otherImages.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {otherImages.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`Product image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
