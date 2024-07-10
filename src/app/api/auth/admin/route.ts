import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();

    try {
        const admin = await prisma.users.findUnique({
            where: {
                username: data.username, AND : {
                    role: "Admin"
                }
            }
        });

        if(!admin || admin.password !== data.password){
            return NextResponse.json({message: "Invalid Credentials"}, {status: 401})
        }
        
        return NextResponse.json(admin, {status: 200})
    }catch(e: any){
        console.log(e.message);
        return NextResponse.json({message: "Invalid Credentials"}, {status: 400});
    }
}