"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import Admin from "../_components/admin";

export default function AdminPage(){

    const router = useRouter();

    const handleClick = async (e: any) => {
        e.preventDefault();
        router.push('/addUser');
    }

    return (
        <div className="bg-gradient-to-r from-slate-400 to-red-900  p-1">
            <div className="grid grid-cols-3 gap-5 px-5 py-2">
                <div className="p-2 text-center text-3xl font-semibold">
                    <Link href="/cashier" className="border-2 border-dotted border-red-900 px-10 py-1 bg-red-800 rounded-md hover:bg-red-500 hover:text-red-900">Logout</Link>
                </div>
                <div className="">
                    <h1 className="p-2 text-center text-3xl font-bold">Administrator Panel</h1>
                </div>
                <div className="p-2 text-center text-3xl font-semibold">
                    <Link href='/admin/addUser' className="border-2 border-dotted border-green-900 px-10 py-1 bg-green-800 rounded-md hover:bg-green-400 hover:text-green-900">ADD USER</Link>
                </div>
            </div>
            <div>
                <Admin />
            </div>
        </div>
    );
}