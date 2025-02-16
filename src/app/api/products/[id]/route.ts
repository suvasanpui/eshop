import db from "@/libs/db";
import product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";
import type { RouteHandlerContext } from "next/server"; // ✅ Import correct type

export async function GET(
  req: NextRequest,
  context: RouteHandlerContext<{ id: string }> // ✅ Correctly define `context`
) {
  try {
    await db();
    const { id } = context.params; // ✅ Correct way to access params

    const result = await product.findOne({ _id: id });

    if (!result) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error },
      { status: 500 }
    );
  }
}
