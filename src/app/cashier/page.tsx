'use client'

import { useRouter } from "next/navigation";
import Cash from "../_components/cash";
import { useState } from "react";
import PopupGfg from "../_components/popup";
import Model from "../_components/model";
import toast from "react-hot-toast";

export default function Cashier(){
    
    const [pop, setPop] = useState(false);

    const router = useRouter();

    const handleAdmin = () => {
        setPop(true)
        // router.push('/admin');
    }

    const handleClick = () => {
        router.push('/products');
    }

    return (
        <div className="">
            {pop && <PopupGfg isClicked={pop}/>}
            <div className="grid grid-cols-3 gap-5 px-5 pt-2">
                <div className="p-2 text-center text-3xl font-semibold">
                    <button onClick={handleAdmin} className="drop-shadow-[0_3px_3px_rgba(10,10,10,10)] border-2 border-transparent px-10 py-1 bg-red-600 rounded-md hover:bg-red-400 hover:text-red-900">ADMIN</button>
                </div>
                <div className="">
                    <h1 className="p-2 drop-shadow-[0_2px_2px_rgba(10,10,10,10)] text-center text-6xl text-amber-800 font-semibold italic">Lepolankeng</h1>
                </div>
                <div className="p-2 text-center text-3xl font-semibold">
                    <button onClick={handleClick} className="drop-shadow-[0_3px_3px_rgba(10,10,10,10)] border-2 border-transparent px-10 py-1 bg-green-600 rounded-md hover:bg-green-400 hover:text-green-900">Register Product</button>
                </div>
            </div>
            <div>
                {/* <PopupGfg /> */}
                <Cash />
            </div>
        </div>
    );
}