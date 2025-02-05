import db from '@/libs/db'
import product from '@/models/products'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }  // Changed type to only allow string
) {
  try {
    await db();
    const { id } = params;
    
    const res = await product.findOne({ _id: id });
    
    if (!res) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product fetched successfully",
      res
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding product",error },
      { status: 500 }
    );
  }
}