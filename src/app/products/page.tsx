'use client'

import { useRouter } from "next/navigation";
import Card from "../_components/cash";
import Link from "next/link";
import { Product } from "../_components/registerProduct";
import { useState } from "react";
import { useCategory } from "../_components/categoryContext";

export default function Cashier(){
    
    const router = useRouter();

    // const [cat, setCat] = useState<String>();
    const { category, setCategory } = useCategory();
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        router.push('/cashier')
    }

    const onCategory = (newCat: string) => {
        setCategory(newCat);
        console.log(newCat)
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
        }, 1000);
    }
    
    return (
        <div className="">
            <div className="grid grid-cols-3 gap-5 px-5 py-2">
                <div className="p-2 text-center text-3xl font-semibold">
                    <Link href="/cashier" className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] border-2 border-transparent px-10 py-1 bg-blue-400 rounded-md hover:bg-blue-300 hover:text-blue-900">Home</Link>
                </div>
                <div className="">
                    <h1 className="p-2 text-center text-amber-800 text-4xl font-bold italic">Products Page</h1>
                </div>
                <div className="dropdown p-2 font-semibold px-10 py-1">
                    <button className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] category border-2 border-transparent text-3xl px-10 py-1 rounded-md hover:bg-amber-400 hover:text-green-900">Category</button>
                    {isVisible && (
                        <div className="dropdown-content rounded-lg text-center ml-5 border-2 border-dotted border-black">
                            <button onClick={() => onCategory("liquor")} className="choice hover:bg-blue-400 text-xl px-20 p-3">Liquor</button><br/>
                            <button onClick={() => onCategory("stock")} className="choice hover:bg-blue-400 text-xl px-20 p-3">Product</button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Product />
            </div>
        </div>
    );
}