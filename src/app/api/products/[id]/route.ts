import db from '@/libs/db';
import product from '@/models/products';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }  // Direct inline type definition
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
            data: res
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching product",error},
            { status: 500 }
        );
    }
}
