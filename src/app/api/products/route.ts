import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const products = await prisma.products.findMany();

    return NextResponse.json(products);
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    console.log("Products Post Request");

    const data = await req.json();

    try {
        const product = await prisma.products.create({
            data: { 
                name: data.name, 
                code: data.code,
                price: data.price, 
                category: data.category, 
                quantity: data.quantity,
                inStock: data.inStock
            }
        });

        return NextResponse.json(product);
    }catch(e: any){
        console.log(e.message)
        return NextResponse.json({}, {status: 400});
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    console.log("Products Delete Request");

    const data = await res.json();

    try {
        const product = prisma.products.delete({
            where: {
                id: data.id
            }
        });
    }catch(e: any) {
        return NextResponse.json({}, {status: 400});
    }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
    console.log("Products Put Request");

    const data = await res.json();

    try {
        const products = prisma.products.update({
            where: {
                id: data.id
            },
            data: data
        });

        return NextResponse.json(products);
    }catch(e: any){
        return NextResponse.json({}, {status: 400});
    }
}

