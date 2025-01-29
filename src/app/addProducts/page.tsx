"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    brand: "",
    sku: "",
    discountPercentage: 0,
    tags: [],
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "in-stock",
    returnPolicy: "",
    minimumOrderQuantity: 1,
    images: [],
    thumbnail: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { message } = result;
      if (message) {
        router.push("/products");
      }
      console.log(result);
    } catch (err) {
      console.error(
        "Failed to add product:",
        err instanceof Error ? err.message : err
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested object (dimensions)

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="space-y-4">
        {/* Basic Information */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="dimensions.width"
            placeholder="Width"
            value={product.dimensions.width}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="dimensions.height"
            placeholder="Height"
            value={product.dimensions.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="dimensions.depth"
            placeholder="Depth"
            value={product.dimensions.depth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

export default Page;
