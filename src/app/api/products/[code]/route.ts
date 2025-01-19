// app/api/products/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'path';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: { code: string } }) => {
    console.log("Products Get Request");

    const code = parseInt(params.code, 10); // Convert code to number with radix

    if (isNaN(code)) {
        return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
    }

    try {
        const product = await prisma.products.findUnique({
            where: { code },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Convert BigInt fields to strings
        const productWithString = {
            ...product,
            // Example field, adjust based on your schema
            id: product.id.toString(),
            code: product.code.toString(),
            // Add other fields as necessary
        };

        return NextResponse.json(productWithString);

    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest, { params }: { params: { code: string } }) => {
    try {
        console.log("It reaches");
        // Parse the incoming data
        const data = await req.json();
        const code = params.code;

            // Convert code to an integer
            const parsedCode = parseInt(code, 10);

            // Fetch the current product
            const products = await prisma.products.findUnique({
                where: { code: parsedCode },
            });

            console.log(products)

            if (!products) {
                console.log(`code: ${parsedCode}, value: ${data.stock_quantity}`)
                return NextResponse.json({ error: `Product not found: ${name}` }, { status: 404 });
            }

            // Calculate the new inStock value
            const currentStock = Number(products?.inStock) || 0;
            const additionalStock = Number(data?.code_quantity) || 0;

            const newInStock = currentStock + additionalStock;

            console.log(currentStock)
            console.log(additionalStock)
            console.log(newInStock)

            // Ensure newInStock doesn't go negative
            if (newInStock < 0) {
                console.log("Product goes negative");
                return NextResponse.json({ error: `Insufficient stock for product: ${name}` }, { status: 400 });
            }

            // Update the product's inStock attribute
            await prisma.products.update({
                where: { code: parsedCode },
                data: { inStock: newInStock }
            });
        // }

        return NextResponse.json({ message: 'Stock updated successfully' }, { status: 200 });

    }catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}