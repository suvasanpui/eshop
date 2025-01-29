import db from "@/libs/db";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    await db();
    const data = await request.json();

    // Required fields validation
    const requiredFields = ['title', 'description', 'category', 'price', 'brand', 'sku', 'stock'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const newProduct = await Product.create(data);
    return NextResponse.json(
      { 
        success: true,
        message: "Product created successfully", 
        product: newProduct 
      },
      { status: 201 }
    );
  } catch (err) {
    const error = err as Error;
    console.error("Error in POST /api/products:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Internal Server Error",
        message: error.message || "Unknown error occurred"  
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await db();
    const products = await Product.find();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          message: "No products found" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: "Products fetched successfully",
        products 
      },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Internal Server Error",
        message: error.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}


