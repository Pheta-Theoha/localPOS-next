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
        <div className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] bg-gradient-to-r from-slate-400 to-red-800  p-1">
            <div className="grid grid-cols-3 gap-5 px-5 py-2">
                <div className="p-2 text-center text-3xl font-semibold">
                    <Link href="/cashier" className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] border-2 border-transparent px-10 py-1 bg-red-800 rounded-md hover:bg-red-500 hover:text-red-900">Logout</Link>
                </div>
                <div className="">
                    <h1 className="p-2 text-center drop-shadow-[0_2px_2px_rgba(20,20,20,20)] text-red-500 text-4xl font-bold">Administrator Panel</h1>
                </div>
                <div className="p-2 text-center text-3xl font-semibold">
                    <Link href='/admin/addUser' className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] border-2 border-transparent px-10 py-1 bg-green-800 rounded-md hover:bg-green-400 hover:text-green-900">ADD USER</Link>
                </div>
            </div>
            <div>
                <Admin />
            </div>
        </div>
    );
}