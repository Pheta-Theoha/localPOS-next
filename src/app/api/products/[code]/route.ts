// app/api/products/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
        // Parse the incoming data
        const updates = await req.json();

        // Loop through each key-value pair and update the corresponding product
        for (const code of Object.keys(updates)) {
            const value = updates[code];

            // Convert code to integer
            const parsedCode = parseInt(code, 10);

            if (isNaN(parsedCode)) {
                return NextResponse.json({ error: `Invalid code format: ${code}` }, { status: 400 });
            }

            // Update the product inStock attribute
            await prisma.products.update({
                where: { code: parsedCode },
                data: { inStock: value }
            });
        }

        return NextResponse.json({ message: 'Products updated successfully' }, { status: 200 });

    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
};