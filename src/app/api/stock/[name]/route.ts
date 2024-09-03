// app/api/stock/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: { name: string } }) => {
    console.log("Stock Get Request");
    console.log("Params:", params);
    // console.log(params.code);

    try {
        const name = params.name;

        // Check if name is valid
        if (!name) {
            return NextResponse.json({ error: 'Invalid request: name parameter is missing or undefined' }, { status: 400 });
        }

        // Query the stock based on the provided name
        const stock = await prisma.stock.findUnique({
            where: { name },
        });

        // Check if stock was found
        if (!stock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        // Convert BigInt fields to strings (if applicable)
        const stockWithString = {
            ...stock,
            id: stock.id.toString(),  // Convert BigInt fields to strings if necessary
        };

        return NextResponse.json(stockWithString);

    } catch (e: any) {
        console.error("Error fetching stock:", e.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};


// export const PUT = async (req: NextRequest, { params }: { params: { name: string } }) => {
//     try {
//         // Parse the incoming data
//         const updates = await req.json();

//         let name = updates.name;

//         // Loop through each key-value pair and update the corresponding product
//         for (const name of Object.keys(updates)) {
//             const value = updates[name];

//             // Convert code to integer
//             // const parsedCode = parseInt(code, 10);

//             // if (isNaN(parsedCode)) {
//             //     return NextResponse.json({ error: `Invalid code format: ${code}` }, { status: 400 });
//             // }

//             // Update the product inStock attribute
//             await prisma.stock.update({
//                 where: { name: name },
//                 data: { inStock: value }
//             });
//         }

//         return NextResponse.json({ message: 'Products updated successfully' }, { status: 200 });

//     } catch (e: any) {
//         console.error(e.message);
//         return NextResponse.json({ error: e.message }, { status: 500 });
//     }
// };

export const PUT = async (req: NextRequest, { params }: { params: { name: string } }) => {
    try {
        console.log("It reaches");
        // Parse the incoming data
        const data = await req.json();
        const name = params.name;

        // Loop through each key-value pair and update the corresponding product
        // for (let name of Object.keys(updates)) {
        //     const value = updates[name];
        //     console.log(`Processing name: ${name}, value: ${value}`);

            // Convert code to an integer
            // const parsedCode = parseInt(name, 10);

            // if (isNaN(parsedCode)) {
            //     console.log("Invalid Code format");
            //     return NextResponse.json({ error: `Invalid code format: ${code}` }, { status: 400 });
            // }

            // Fetch the current product
            const stock = await prisma.stock.findUnique({
                where: { name: name },
            });

            console.log(stock)

            if (!stock) {
                console.log(`name: ${name}, value: ${data.stock_quantity}`)
                return NextResponse.json({ error: `Stock not found: ${name}` }, { status: 404 });
            }

            // Calculate the new inStock value
            const newInStock = Number(stock?.inStock) + Number(data.stock_quantity);

            // Ensure newInStock doesn't go negative
            if (newInStock < 0) {
                console.log("Stock goes negative");
                return NextResponse.json({ error: `Insufficient stock for product: ${name}` }, { status: 400 });
            }

            // Update the product's inStock attribute
            await prisma.stock.update({
                where: { name: name },
                data: { inStock: newInStock }
            });
        // }

        return NextResponse.json({ message: 'Stock updated successfully' }, { status: 200 });

    }catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}