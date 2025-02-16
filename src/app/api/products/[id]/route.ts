import db from '@/libs/db';
import product from '@/models/products';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!params?.id) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {
    await db();
    
    const productDoc = await product.findOne({ 
      _id: params.id.toString() 
    });

    if (!productDoc) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product fetched successfully",
      data: productDoc
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product",error },
      { status: 500 }
    );
  }
}
