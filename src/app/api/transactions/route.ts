import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/db";
// import Transactions from "@/app/transactions/page";

export const GET = async(req: NextRequest, res: NextResponse) => {
    console.log("Get Transactions")
    const transactions = await prisma.transactions.findMany();

    return NextResponse.json(transactions);
}

export const POST = async(req: NextRequest, res: NextResponse) => {
    
    const data = await req.json();
    
    try {
        const transaction = await prisma.transactions.create({
            data: {
                total: data.total,
                amount_paid: data.amount_paid,
                change: data.change,
                products: data.products,
                userId: data.userId,
                // products: {
                //     create: data.productId.map((productId: any) => ({
                //         product: { connect: { id: productId } },
                //     }))
                // }
            }
        });
        return NextResponse.json(transaction);
    }catch(e: any){
        console.log(e.message);
        return NextResponse.json({}, { status: 400 });
    }
}