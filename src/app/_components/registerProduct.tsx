import { Dropdown, MenuItem, Select } from "@nextui-org/react";
import { FormEvent, useContext } from "react";
import "../globals.css"
import { useState, useEffect } from "react";
import { UserContext } from "./userContext";
import { useCategory } from "./categoryContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Product = () => {

    const router = useRouter();

    const { username } = useContext(UserContext);
    const { category } = useCategory();

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [currentTime, setCurrentTime] = useState<string>(() => new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    interface Product {
        name: String;
        code: any;
        price: Number;
        category: String;
        quantity: Number;
        inStock: Number;
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const prod = async() => {
            try {
                const response = await fetch('http://localhost:3000/api/products/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    // cache: "force-cache"
                });

                if(!response.ok){
                    throw new Error("Not Okay")
                }

                const data = await response.json();
                console.log("Fetched products", data);

                const products = data;
                setProducts(products);
            }catch(e: any){
                console.log(e.message);
            }
        }
        prod();
    }, []);

    const record = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const code = Number(formData.get('code'));
        const name = formData.get('name');
        const price = parseFloat(formData.get('price') as string);
        const quantity = Number(formData.get('quantity'));
        const inStock = Number(formData.get('quantity'));
        console.log(code, name, price, quantity, category, inStock);

        const response = await fetch('http://localhost:3000/api/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, name, price, quantity, category, inStock })
        })
        console.log(code, name, price, quantity, category, inStock);
        if(response.ok){
            toast.success("Registered!");
            router.refresh();
        }else {
            const errorMessage = await response.json();
            toast.error(errorMessage.message);
        }
    }

    const handlClick = () => {
        // 
    }

    return (
        <div className="border-2 border-slate-500 m-5 grid grid-rows-2">
            <div className="grid grid-cols-2">
                <div className="border-2 border-slate-400 m-3 rounded-lg p-2">
                    <h1 className="text-center text-3xl italic underline font-semibold">Register</h1>
                    <div className="border-2 border-dotted rounded-lg border-slate-400 p-2 m-2">
                            <div className="grid grid-cols-2 gap-1 p-2 text-xl font-semibold">
                                <div className="grid grid-rows-4 place-items-left">
                        {/* <form className="p-2 text-xl font-semibold"> */}
                                    <label className="mt-3">Code:</label>
                                    <label className="mt-3">Name:</label>
                                    <label className="mt-3">Price(M):</label>
                                    <label className="mt-3">Quantity:</label>
                                    <button className="text-2xl text-center border-2 border-black rounded-lg mr-12 bg-red-700 font-bold hover:bg-red-500 hover:text-3xl hover:text-red-200">Delete</button>
                                </div>
                                <div className="place-items-left">
                                    <form onSubmit={record} className="grid grid-rows-4">
                                        <input type="text" name="code" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full" autoFocus/>
                                        <input type="text" name="name" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/>
                                        <input type="text" name="price" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/> 
                                        <input type="number" name="quantity" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/>
                                        <input type="submit" value="Save" className="text-2xl text-center border-2 border-black rounded-lg mx-2 mt-2  bg-green-400 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600"/>
                                    </form>
                        {/* </form> */}
                                </div>
                            </div>
                    </div>
                    <div className="grid grid-cols-2">
                    </div>
                </div>
                <div className="border-2 border-slate-400 m-3 rounded-lg p-2 h-100">
                    <div>
                        <h1 className="text-center text-3xl italic underline font-semibold">Product List</h1>
                    </div>
                    <div className="border-2 border-dotted rounded-lg border-slate-400 p-2 m-2 grid grid-cols-3 h-80 overflow-y-scroll">
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Name</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {products.map((product: Product, index: any) => (
                                    <li key={index}>{product.name}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Price</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {products.map((product: Product, index: any) => (
                                    <li key={index}>M{product.price}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Quantity</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {products.map((product: Product, index: any) => (
                                    <li key={index}>{product.quantity}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 border-slate-400 m-3 rounded-lg p-2">
                <h1 className="text-3xl font-semibold text-center">Operating User</h1>
                <div className="grid grid-cols-3 border-2 border-dotted border-slate-500 rounded-xl">
                    <div className="grid grid-cols-2 border-2 border-dotted border-slate-500 rounded-lg m-5 col-span-2">
                        <div className="grid grid-rows-4">
                            <h3 className="text-3xl p-5">Username: </h3>
                            {/* <h3 className="text-3xl p-5">Full Name: </h3> */}
                            <h3 className="text-3xl p-5">Changes: </h3>
                            <h3 className="text-3xl p-5">Date: </h3>
                            <h3 className="text-3xl p-5">Time: </h3>
                        </div>
                        <div className="grid grid-rows-4 m-2">
                            <h1 className="my-2 rounded-md bg-slate-500 p-3 text-3xl">{username}</h1>
                            {/* <h1 className="my-2 rounded-md bg-slate-500 p-3 text-3xl">{}</h1> */}
                            <h1 className="my-2 rounded-md bg-slate-500 p-3 text-3xl">{}</h1>
                            <h1 className="my-2 rounded-md bg-slate-500 p-3 text-3xl">{formattedDate}</h1>
                            <h1 className="my-2 rounded-md bg-slate-500 p-3 text-3xl">{currentTime}</h1>
                        </div>
                    </div>
                    <div className="p-20 border-2 border-dotted m-5 border-slate-500 rounded-lg">
                        <div className="qr h-full">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}