import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const users = await prisma.users.findMany();

    console.log("Get Request");

    return NextResponse.json(users);
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    console.log("Post Request")

    const data = await req.json();

    try {
        const user = await prisma.users.create({
            data : { 
                username: data.username, 
                role: data.role, 
                password: data.password,
            }
        });
        return NextResponse.json(user)
    }catch(e: any){
        return NextResponse.json({}, { status: 400})
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    console.log("Delete Request");

    const data = await res.json();

    try {
        const users = prisma.users.delete({
            where: {
                id: data.id
            }
        });
        return NextResponse.json(users);
    }catch(e: any) {
        return NextResponse.json({}, {status: 400});
    }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
    const data = await req.json();

    try {
        const user = prisma.users.update({
            where: {
                id: data.id
            },
            data: {
                username: data.username,
                role: data.role,
                password: data.password
            }
        })
    } catch(e:any){
        return NextResponse.json({}, {status: 400});
    }
}