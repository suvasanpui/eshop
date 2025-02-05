import db from '@/libs/db';
import product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await db();
        const { id } = params;  // Extract `id` from the dynamic route params

        // Query the product by ID
        const res = await product.findOne({ _id: id });

        if (!res) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Topic fetched successfully",
            data: res
        });
    } catch (error) {
        console.error("Error fetching topic:", error);
        return NextResponse.json({ message: "Error fetching topic", error }, { status: 500 });
    }
}
