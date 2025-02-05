import db from '@/libs/db';
import product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params; // Correct way to access dynamic route params

    await db();
    const res = await product.findOne({ _id: id });

    if (!res) {
        return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic fetched successfully", res });
}
