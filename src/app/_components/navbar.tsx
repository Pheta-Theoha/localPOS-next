'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar(){
    const router = useRouter();
    const current = usePathname()
    let g = false
    if(current != '/'){
        g = true
    }
    if(g){
        return (
            <div className="grid grid-cols-5 gap-5 p-4 bg-gradient-to-b from-slate-400 to-gray-800 w-full text-3xl font-medium">
                <Link href="/cashier">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/transactions">Transactions</Link>
                <Link href="/admin">Admin</Link>
                <Link href="/">Logout</Link>
            </div>
        );
    } else {
        return false
    }
}