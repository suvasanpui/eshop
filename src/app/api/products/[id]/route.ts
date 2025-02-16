import db from '@/libs/db';
import product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await db();
    const { id } = params;

    const res = await product.findOne({ _id: id });

    if (!res) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Topic fetched successfully",
      data: res,
    });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { message: "Error fetching topic", error },
      { status: 500 }
    );
  }
}
