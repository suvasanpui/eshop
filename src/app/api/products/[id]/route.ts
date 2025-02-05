import db from '@/libs/db'
import product from '@/models/products'
import { NextRequest, NextResponse } from 'next/server'


//find a specific topic
export async function GET(request:NextRequest,{params}:{params:{id:string | number}}){
    const {id}=params;
    await db();
    const res=await product.findOne({_id:id});
    if(!res){
        return NextResponse.json({message:"topic is not found"});
    }
    return NextResponse.json({message:"Topic etch successfully",res});
}