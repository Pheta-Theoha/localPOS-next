import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
    const productId = req.query.code as string; // Extract product ID from the query parameters

    try {
        const product = await prisma.products.findUnique({
            where: {
                code: parseInt(productId) // Convert productId to integer (assuming id is numeric)
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// export const POST = async (req: NextRequest, res: NextResponse) => {
//     console.log("Products Post Request");

//     const data = await req.json();

//     try {
//         const product = await prisma.products.create({
//             data: { 
//                 name: data.name, 
//                 code: data.code,
//                 price: data.price, 
//                 category: data.category, 
//                 quantity: data.quantity,
//                 // inStock: data.inStock
//             }
//         });

//         return NextResponse.json(product);
//     }catch(e: any){
//         console.log(e.message)
//         return NextResponse.json({}, {status: 400});
//     }
// };

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

