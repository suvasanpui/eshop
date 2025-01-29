import { ProductType } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";



export const POST=async(request: NextRequest)=>{
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const body = await request.json();
    const { items, email } =await body;

    if (!items?.length || !email) {
      return new NextResponse("Missing required parameters", { status: 400 });
    }

    const lineItems = await items.map((item: ProductType) => ({
      quantity: item?.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item?.price * 100 * (1 - (item?.discountPercentage || 0) / 100)), // Convert to cents
        product_data: {
          name: item?.title,
          images: item?.images,
          description:item?.description,
        },
      },
      
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        email,
      }
      
    });

    return NextResponse.json({ 
      message: "Success",
      success:true,  
      id: session?.id,
      });
  } catch (error) {
    console.error('Stripe error:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
