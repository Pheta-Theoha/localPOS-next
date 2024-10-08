import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const products = await prisma.products.findMany();

    const serializedProducts = JSON.parse(JSON.stringify(products, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(serializedProducts);

    // return NextResponse.json(products);
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
                inStock: data.quantity
            }
        });

        const serializedProduct = JSON.parse(JSON.stringify(product, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return NextResponse.json(serializedProduct);

        // return NextResponse.json(product);
    }catch(e: any){
        console.log(e.message)
        return NextResponse.json({}, {status: 400});
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    console.log("Products Delete Request");

    const data = await req.json();

    console.log("Request Data:", data);

    const name = data.remove_name;

    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const product = await prisma.products.delete({
            where: {
                name: name
            }
        });

        return NextResponse.json({ message: 'Product deleted successfully' }, {status: 200});
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        console.log("It reaches");
        // Parse the incoming data
        const updates = await req.json();

        // Loop through each key-value pair and update the corresponding product
        for (const code of Object.keys(updates)) {
            const value = updates[code];
            console.log(`Processing code: ${code}, value: ${value}`);

            // Convert code to an integer
            const parsedCode = parseInt(code, 10);

            if (isNaN(parsedCode)) {
                console.log("Invalid Code format");
                return NextResponse.json({ error: `Invalid code format: ${code}` }, { status: 400 });
            }

            // Fetch the current product
            const product = await prisma.products.findUnique({
                where: { code: parsedCode },
            });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${code}` }, { status: 404 });
            }

            // Calculate the new inStock value
            const newInStock = product.inStock - value;

            // Ensure newInStock doesn't go negative
            if (newInStock < 0) {
                console.log("Stock goes negative");
                return NextResponse.json({ error: `Insufficient stock for product code: ${code}` }, { status: 406 });
            }

            // Update the product's inStock attribute
            await prisma.products.update({
                where: { code: parsedCode },
                data: { inStock: newInStock }
            });
        }

        return NextResponse.json({ message: 'Products updated successfully' }, { status: 200 });

    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}