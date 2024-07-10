// import { NextApiRequest, NextApiResponse } from "next";
// import z from 'zod';

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
// import { SignIn } from '@/auth';

// const createUserSchema = z.object({
//     fullName: z.string(),
//     username: z.string(),
//     role: z.string(),
//     password: z.string()
// }).strict();

// function validateUserSchema (data: any) {
//     try {
//         const parseData = createUserSchema.parse(data)
//         return parseData;
//     }catch(error: any){
//         throw new Error(error.message);
//     }
// }

// export const POST = async (request: any) => {
//     try {
//         const json = await request.json();
//         const validateUser = validateUserSchema(json);
//     }
//     catch(e: any){
//         console.log(e)
//     }
// }



export const GET = async (req: Request, res: Response) => {
    console.log("Get Request")
    const users = await prisma.users.findMany();

    return NextResponse.json(users);
};

export const POST = async (req: NextRequest, res: NextResponse) => {
    console.log("Post Request")

    // var user: any;

    const data = await req.json();

    try {
        const user = await prisma.users.findUnique({
            where: {
                username: data.username
            },
            select: {
                username: true,
                password: true,
                role: true
            }
        });

        if(!user || user.password !== data.password){
            return NextResponse.json({message: "Invalid Credentials"}, {status: 401})
        }
        
        return NextResponse.json(user, {status: 200})
        

    } catch(e: any){
        console.log(e.message);
        return NextResponse.json({}, {status: 400});
    }

    // try {

    //     const users = await prisma.users.create({
    //         data : { 
    //             // fullName: data.fullName, 
    //             username: data.username, 
    //             // role: data.role, 
    //             password: data.password 
    //         }
    //     });

    //     return NextResponse.json(users)
    // }catch(e: any){
    //     return NextResponse.json({}, { status: 400})
    // }
};

// export const DELETE = async (req: NextRequest, res: NextResponse) => {
//     console.log("Delete Request");

//     const data = await res.json();

//     try {
//         const product = prisma.users.delete({
//             where: {
//                 id: data.id
//             }
//         });
//     }catch(e: any) {
//         return NextResponse.json({}, {status: 400});
//     }
// };