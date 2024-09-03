import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const stock = await prisma.stock.findMany();

    // const serializedProducts = JSON.parse(JSON.stringify(stock, (key, value) =>
    //     typeof value === 'bigint' ? value.toString() : value
    // ));

    // return NextResponse.json(serializedProducts);
    

    return NextResponse.json(stock);
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    console.log("Stock Post Request");

    const data = await req.json();

    try {
        const stock = await prisma.stock.create({
            data: { 
                name: data.stock_name_add, 
                costPrice: data.costPrice,
                quantity: data.stock_quantity,
                unit_price: data.unit_price,
                inStock: data.stock_quantity
            }
        });

        // const serializedProduct = JSON.parse(JSON.stringify(product, (key, value) =>
        //     typeof value === 'bigint' ? value.toString() : value
        // ));

        return NextResponse.json(stock);

        // return NextResponse.json(product);
    }catch(e: any){
        console.log(e.message)
        return NextResponse.json({}, {status: 400});
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    console.log("Stock Delete Request");

    const data = await req.json();

    console.log("Request Data:", data);

    const name = data.stock_item;

    if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const stock = await prisma.stock.delete({
            where: {
                name: name
            }
        });

        return NextResponse.json({ message: 'Stock deleted successfully' }, {status: 200});
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

        let stock_info = updates.stock_count_global
        console.log(stock_info)

        // Loop through each key-value pair and update the corresponding product
        for (const name of Object.keys(stock_info)) {
            console.log('passed data:',name)
            const value = stock_info[name];
            console.log(`Processing name: ${name}, value: ${value}`);

            // Convert code to an integer
            // const parsedCode = parseInt(code, 10);

            // if (isNaN(parsedCode)) {
            //     console.log("Invalid Code format");
            //     return NextResponse.json({ error: `Invalid code format: ${code}` }, { status: 400 });
            // }

            // Fetch the current product
            const stock = await prisma.stock.findUnique({
                where: { name: name },
            });

            if (!stock) {
                console.log(`Stock not found: ${name}`)
                return NextResponse.json({ error: `Stock not found: ${name}` }, { status: 404 });
            }

            let newInStock = 0;

            // Calculate the new inStock value
            if(!updates.sell){
                newInStock = stock.inStock + value;
            }else{
                newInStock = stock.inStock - value;
            }

            // Ensure newInStock doesn't go negative
            if (newInStock < 0) {
                console.log("Stock goes negative");
                return NextResponse.json({ error: `Insufficient stock for product code: ${name}` }, { status: 406 });
            }

            // Update the product's inStock attribute
            await prisma.stock.update({
                where: { name: name },
                data: { inStock: newInStock }
            });
        }

        return NextResponse.json({ message: 'Stock updated successfully' }, { status: 200 });

    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}