import db from '@/libs/db'
import product from '@/models/products'
import { NextRequest, NextResponse } from 'next/server'

type Props = {
  params: {
    id: string
  }
}

export async function GET(
  req: NextRequest,
  context: Props
) {
  try {
    await db();
    const { id } = context.params;
    
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
      { message: "Error finding product" , error},
      { status: 500 }
    );
  }
}