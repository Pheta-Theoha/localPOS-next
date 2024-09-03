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

    interface Stock {
        name: String;
        costPrice: String;
        quantity: Number;
        unit_price: Number;
        inStock: Number;
    }

    const [products, setProducts] = useState([])
    const [stock, setStock] = useState([])

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

    useEffect(() => {
        const stoc = async() => {
            try {
                const response = await fetch('http://localhost:3000/api/stock/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    // cache: "force-cache"
                });

                if(!response.ok){
                    throw new Error("Not Okay")
                }

                const data = await response.json();
                console.log("Fetched stock", data);

                const stock = data;
                setStock(stock);
            }catch(e: any){
                console.log(e.message);
            }
        }
        stoc();
    }, [])

    var product_count: Record<string, number> = {};
    var stock_count: Record<string, number> = {};

    const reStock = async() => {
        console.log("Restocking!");

        let code = (document.getElementById("name") as HTMLInputElement).value;
        let name = (document.getElementById("stock_name_add") as HTMLInputElement).value;

        console.log(code);

        if(code){

            let code_quantity = (document.getElementById("quantity") as HTMLInputElement).value;
            
            let product_response = await fetch(`http://localhost:3000/api/products/${code}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({code_quantity})
            })

            if(product_response.ok){
                console.log("Product updated");
                toast.success("Product Restocked");
                setTimeout(() => {
                    router.refresh();
                }, 1000)
            }else{
                console.log("Product not updated");
                toast.error("Product not stocked");
            }
        }else {
            let stock_quantity = (document.getElementById("stock_quantity") as HTMLInputElement).value;
            
            let stock_response = await fetch(`http://localhost:3000/api/stock/${name}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stock_quantity})
            })

            if(stock_response.ok){
                console.log("Stock updated");
                toast.success("Stock updated!")
                setTimeout(() => {
                    router.refresh();
                }, 1000)
            }
        }
    }

    const removeStock = async() => {
        console.log("Remove Stock");

        let stock_item = (document.getElementById('stock_name_add') as HTMLInputElement).value;
        console.log(stock_item);

        let stock_remove_response = await fetch('http://localhost:3000/api/stock/', {
            method: 'DELETE',
            headers: {'COntent-Type': 'application/json'},
            body: JSON.stringify({stock_item})
        })

        if(stock_remove_response.ok){
            console.log("Stock removed")
            toast.success("Stock Removed!")
            setTimeout(() => {
                router.refresh();
            }, 3000)
        }
    }

    const addStock = async() => {
        console.log("Add Stock")
        
        const stock_name_add = (document.getElementById("stock_name_add") as HTMLInputElement).value;
        const costPrice = Number((document.getElementById("costPrice") as HTMLInputElement).value);
        const stock_quantity = Number((document.getElementById("stock_quantity") as HTMLInputElement).value);
        const unit_price = Number((document.getElementById("unit_price") as HTMLInputElement).value);
        // const stock_inStock = quantity;
        console.log("Stock to add:", stock_name_add);

        const stock_response = await fetch('http://localhost:3000/api/stock/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({stock_name_add, costPrice, stock_quantity, unit_price})
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
        // const inStock = Number(formData.get('quantity'));
        console.log(code, name, price, quantity, category);

        if(!category){
            toast.error("Select Category");
        }else{
            const response = await fetch('http://localhost:3000/api/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, name, price, quantity, category })
            })

            console.log(code, name, price, quantity, category);
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
        <div className="border-2 rounded-md border-slate-500 m-5 grid grid-rows-2">
            <div className="grid grid-cols-2">
                <div className="border-2 bg-slate-400 border-slate-400 m-3 rounded-lg p-2">
                    <h1 className="text-center text-3xl italic underline font-semibold">Register</h1>
                    <div className="border-2 border-dotted rounded-lg bg-slate-300 border-slate-400 p-2 py-10 m-2">
                        <div className="grid grid-cols-2 gap-1 p-2 text-xl font-semibold">
                            <div className="grid grid-rows-4 place-items-left">
                                <label className="mt-3">Code:</label>
                                <label className="mt-3">Name:</label>
                                <label className="mt-3">Price(M):</label>
                                <label className="mt-3">Quantity:</label>
                                <button onClick={removeProduct} className="text-2xl text-center border-2 border-black rounded-lg mr-12 bg-red-700 font-bold hover:bg-red-500 hover:text-3xl hover:text-red-200">Delete</button>
                            </div>
                            <div className="place-items-left">
                                <form onSubmit={record} className="grid grid-rows-4">
                                    <input type="text" id="name" title="" placeholder="" name="code" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-400 w-full" autoFocus/>
                                    <input type="text" title="" placeholder="" name="name" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-400 w-full"/>
                                    <input type="text" title="" placeholder="" name="price" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-400 w-full"/> 
                                    <input type="number" id="quantity" title="" placeholder="" name="quantity" className="text-black font-semibold p-2 m-2 rounded-xl bg-slate-400 w-full"/>
                                    <input type="submit" title="" placeholder="" value="Save" className="text-2xl text-center border-2 border-black rounded-lg ml-2 mt-2  bg-green-400 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-2 bg-slate-400 border-slate-400 m-3 rounded-lg p-2">
                    <div>
                        <h1 className="text-center text-3xl italic underline font-semibold">Product List</h1>
                    </div>
                    <div className="border-2 border-dotted rounded-lg bg-slate-300 border-slate-400 p-2 m-2 grid grid-cols-4 h-96 overflow-y-scroll">
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
            <div className="border-2 border-slate-400 bg-gradient-to-r from-slate-400 to-gray-400 m-3 rounded-lg p-2">
                <div className="grid grid-cols-2">
                    <h1 className="text-3xl font-semibold text-center">Manual Stock</h1>
                    <h1 className="text-3xl font-semibold text-center">Stock List</h1>
                </div>
                <div className="grid grid-cols-6 border-2 border-dotted bg-slate-300 border-slate-500 rounded-xl">
                    <div className="p-5 border-2 border-dotted m-5 border-gray-800 rounded-lg col-span-3">
                        <div className="h-full grid grid-cols-2">
                            <div className="grid grid-rows-4 p-4">
                                <label className="text-2xl pt-4 p-2 font-bold">Name:</label>
                                <label className="text-2xl pt-4 p-2 font-bold">Cost Price:</label>
                                <label className="text-2xl pt-4 p-2 font-bold">Quantity:</label>
                                <label className="text-2xl pt-4 p-2 font-bold">Unit Price/Qty:</label>
                            </div>
                            <div className="grid grid-rows-4">
                                <input type="text" id="stock_name_add" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-400 w-full"/>
                                <input type="text" id="costPrice" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-400 w-full"/>
                                <input type="text" id="stock_quantity" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-400 w-full"/>
                                <input type="text" id="unit_price" className="text-xl p-2 text-black font-semibold m-2 rounded-xl bg-slate-400 w-full"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-2 border-dotted rounded-lg bg-slate-300 border-slate-400 p-2 m-5 grid grid-cols-4 col-span-3 h-80 overflow-y-scroll">
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Name</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {stock.map((stock: Stock, index: any) => (
                                    <li key={index}>{stock.name}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Price</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {stock.map((stock: Stock, index: any) => (
                                    <li key={index}>M{stock.costPrice}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h1 className="p-3 text-3xl font-bold">Quantity</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {stock.map((stock: Stock, index: any) => (
                                    <li key={index}>{stock.quantity}</li>
                                ))}
                            </ol>
                        </div>
                        <div>
                            <h1 className="p-3 text-3xl font-bold">In Stock</h1>
                            <ol className="p-2 text-xl font-semibold">
                                {stock.map((stock: Stock, index: any) => (
                                    <li key={index}>{stock.inStock}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 pl-10">
                    <div>
                        <button onClick={removeStock} className="text-2xl text-center border-2 border-transparent rounded-lg px-20 mr-12 bg-gradient-to-r from-red-700 to-amber-600 font-bold hover:bg-gradient-l hover:text-3xl hover:text-red-200">Delete</button>
                        <button title="" onClick={addStock} value="Save" className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] text-2xl text-center border-2 border-transparent rounded-lg px-28 mx-2 mt-2  bg-gradient-to-r from-green-500 to-amber-500 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600">Save</button>
                    </div>
                    <div className="text-center">
                        <button title="" onClick={reStock} value="Save" className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] text-2xl text-center border-2 border-transparent rounded-lg px-28 mx-2 mt-2  bg-blue-500 font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600">Restock</button>
                    </div>
                </div>
            </div>
        </div>
    );
}