// import { Dropdown, MenuItem, Select } from "@nextui-org/react";
import { FormEvent, useContext } from "react";
import "../globals.css"
import { useState, useEffect } from "react";
import { UserContext } from "./userContext";
import { useCategory } from "./categoryContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Product = () => {

    const router = useRouter();

    var [changes, setChanges] = useState(0)
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

    const removeStock = async() => {
        console.log("Remove Stock")
    }

    const addStock = async() => {
        console.log("Add Stock")
        
        const stock_name_add = (document.getElementById("stock_name_add") as HTMLInputElement).value;
        const costPrice = (document.getElementById("costPrice") as HTMLInputElement).value;
        const quantity = (document.getElementById("quantity") as HTMLInputElement).value;
        const unit_price = (document.getElementById("unit_price") as HTMLInputElement).value;
        // const stock_inStock = quantity;
        console.log("Stock to add:", stock_name_add);

        const stock_response = await fetch('http://localhost:3000/api/stock/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({stock_name_add, costPrice, quantity, unit_price})
        })

        if(stock_response.ok){
            toast.success("Stock Added");
            setTimeout(() =>{
                router.refresh()
            }, 2000)
        }
    }

    const printStockProducts = async() => {
        console.log("Print Products & Stock")
    }

    const removeProduct = async() => {
        // const remove_formData = new FormData(event.currentTarget);

        const remove_name = (document.getElementsByName('name')[0] as HTMLInputElement).value;
        console.log("Product to remove:", remove_name);

        const response = await fetch('http://localhost:3000/api/products/', {
            method: 'DELETE',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({remove_name})
        })

        console.log(remove_name)

        if(response.ok){
            toast.success(`${remove_name} deleted!`);
            // router.refresh();
            router.push('/products');
            // setChanges(prevChanges => prevChanges + 1);
        }else {
            // console.log();
            const errorData = await response.json();
            console.log(errorData);
            toast.error(`${remove_name} not deleted!`);
            router.push('/products');
        }
    }

    const record = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const code = Number(formData.get('code'));
        const name = formData.get('name');
        const price = parseFloat(formData.get('price') as string);
        const quantity = Number(formData.get('quantity'));
        const inStock = Number(formData.get('quantity'));
        console.log(code, name, price, quantity, category, inStock);

        if(!category){
            toast.error("Select Category");
        }else{
            const response = await fetch('http://localhost:3000/api/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, name, price, quantity, category, inStock })
            })

            console.log(code, name, price, quantity, category, inStock);
            if(response.ok){
                toast.success("Registered!");
                // setChanges(prevChanges => prevChanges + 1);
                // router.refresh();
                router.push('/products');
            }else {
                const errorMessage = await response.json();
                toast.error("Item already registered!");
                
            }
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
                                    <button onClick={removeProduct} className="text-2xl text-center border-2 border-black rounded-lg mr-12 bg-red-700 font-bold hover:bg-red-500 hover:text-3xl hover:text-red-200">Delete</button>
                                </div>
                                <div className="place-items-left">
                                    <form onSubmit={record} className="grid grid-rows-4">
                                        <input type="text" title="" placeholder="" name="code" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full" autoFocus/>
                                        <input type="text" title="" placeholder="" name="name" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/>
                                        <input type="text" title="" placeholder="" name="price" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/> 
                                        <input type="number" title="" placeholder="" name="quantity" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-500 w-full"/>
                                        <input type="submit" title="" placeholder="" value="Save" className="text-2xl text-center border-2 border-black rounded-lg mx-2 mt-2  bg-green-400 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600"/>
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
                    <div className="border-2 border-dotted rounded-lg border-slate-400 p-2 m-2 grid grid-cols-4 h-80 overflow-y-scroll">
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
                        <div>
                            <h1 className="p-3 text-3xl font-bold">In Stock</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {products.map((product: Product, index: any) => (
                                    <li key={index}>{product.inStock}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 border-slate-400 bg-gradient-to-r from-slate-600 to-gray-400 m-3 rounded-lg p-2">
                <div className="grid grid-cols-2">
                    <h1 className="text-3xl font-semibold text-center">Manual Stock</h1>
                    <h1 className="text-3xl font-semibold text-center">Operating User</h1>
                </div>
                <div className="grid grid-cols-6 border-2 border-dotted border-slate-500 rounded-xl">
                    <div className="p-5 border-2 border-dotted m-5 border-gray-800 rounded-lg col-span-3">
                        <div className="h-full grid grid-cols-2">
                            <div className="grid grid-rows-4 p-4">
                                <label className="text-2xl p-2 font-bold">Name:</label>
                                <label className="text-2xl p-2 font-bold">Cost Price:</label>
                                <label className="text-2xl p-2 font-bold">Quantity:</label>
                                <label className="text-2xl p-2 font-bold">Unit Price:</label>
                            </div>
                            <div className="grid grid-rows-4">
                                <input type="text" name="stock_name_add" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-500 w-full"/>
                                <input type="text" name="costPrice" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-500 w-full"/>
                                <input type="text" name="quantity" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-500 w-full"/>
                                <input type="text" name="unit_price" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-500 w-full"/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-dotted border-gray-800 rounded-lg m-5 col-span-3">
                        <div className="grid grid-rows-4">
                            <h3 className="text-2xl p-5">Username: </h3>
                            {/* <h3 className="text-3xl p-5">Full Name: </h3> */}
                            <h3 className="text-2xl p-5">Changes: </h3>
                            <h3 className="text-2xl p-5">Date: </h3>
                            <h3 className="text-2xl p-5">Time: </h3>
                        </div>
                        <div className="grid grid-rows-4 m-2">
                            {/* <h1 className="my-2 rounded-md bg-slate-500 p-3 text-2xl">{}</h1> */}
                            <h1 className="my-2 rounded-md bg-slate-500 p-2 text-xl font-bold">{username}</h1>
                            <h1 className="my-2 rounded-md bg-slate-500 p-2 text-xl font-bold">{changes}</h1>
                            <h1 className="my-2 w-full overflow-y-auto rounded-md bg-slate-500 py-3 pl-1 text-xl font-bold">{formattedDate}</h1>
                            <h1 className="my-2 rounded-md bg-slate-500 p-3 text-xl font-bold">{currentTime}</h1>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-10">
                    <div>
                        <button onClick={removeStock} className="text-2xl text-center border-2 border-black rounded-lg px-20 mr-12 bg-gradient-to-r from-red-700 to-amber-600 font-bold hover:bg-gradient-l hover:text-3xl hover:text-red-200">Delete</button>
                        <button title="" onClick={addStock} value="Save" className="text-2xl text-center border-2 border-black rounded-lg px-28 mx-2 mt-2  bg-gradient-to-r from-green-500 to-amber-500 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600">Save</button>
                    </div>
                    <div className="text-center">
                        <button title="" onClick={printStockProducts} value="Save" className="text-2xl text-center border-2 border-black border-dotted rounded-lg px-28 mx-2 mt-2  bg-blue-800 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600">Print Products</button>
                    </div>
                </div>
            </div>
        </div>
    );
}