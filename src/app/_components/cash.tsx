"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "./userContext";
import { useContext } from "react";
import { useEffect } from "react";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function Cash() {

    const router = useRouter();

    const onFill = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const code = Number(formData.get('code'));
    }

    const context = useContext(UserContext);
    // const { username, loginTime, previousUser } = useContext(UserContext);

    const { username, loginTime, previousUser } = context;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // const loginTime = new Date().toLocaleTimeString();

    const handleReset = async (e: any) => {
        e.preventDefault();
        router.refresh();
        console.log("Clicked");
    }

    const logout = () => {
        // setPreviousUser(username);
        router.push('/');
    }

    const handleClick2 = async (e: any) => {
        e.preventDefault();
        router.push('/products');
    }

    var product_count: Record<string, number> = {};

    const handleCashOut = async (e: any) => {
        // router.push('/');
        e.preventDefault();
        let total_change = document.getElementById('total_change') as HTMLHeadingElement;
        let amount_paid = parseFloat((document.getElementById('paid') as HTMLInputElement).value);
        let total_big = document.getElementById('total_big') as HTMLHeadingElement;
        let change_field = document.getElementById('change') as HTMLHeadingElement;
        let transactions_processed = document.getElementById('transactions_processed') as HTMLHeadingElement;
        
        // if(total_change) total_change.textContent = `${change.toFixed(2)}`;
        if (amount_paid){
            let change: number = amount_paid - real_total;

            if(change >= 0){
                transactions++;
                if(total_change) {
                    total_change.textContent = "Change:"
                    total_big.textContent = `${change.toFixed(2)}`
                    change_field.textContent = `${change.toFixed(2)}`
                    transactions_processed.textContent = `${transactions}`
                }

                const total = real_total;
                const products = items_list.value;
                const userId = 'admin1'
                console.log(total, amount_paid, change, products, userId);

                try {
                    const response = await fetch('http://localhost:3000/api/transactions/', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({total, amount_paid, change, products, userId})
                    })

        
                    if(response.ok){

                        const response = await fetch('http://localhost:3000/api/products/', {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(product_count)
                        })

                        // console.log(""product_count)

                        if(response.ok){
                            console.log("Modification successful")
                        }else if(response.status === 406){
                            toast.error("Insufficient Products!");
                            throw new Error("Failed to fetch product");
                        }else{
                            console.log("Modification failed");
                            throw new Error("Modification failed!");
                        }

                        toast.success("Sold!")

                        setTimeout(() =>{
                            router.refresh()
                        }, 5000)
                    }
                }catch(error){
                    console.log(e.message)
                }
            }else{
                toast.error("Insufficient funds!")
            }

        }else {
            toast.error("Enter amount paid!");
        }
    }
    

    var total_items: any[] = []; // Initialize as an array
    var real_total = 0;
    var transactions = 0;
    var items_list: any;

    let debounceTimer: NodeJS.Timeout;

    const prod = (code: any) => {
        // Fetch elements from the DOM
        if(debounceTimer){
            clearTimeout(debounceTimer);
        }

        if(code){
            debounceTimer = setTimeout(async () => {
                let item_display = document.getElementById('item') as HTMLHeadingElement;
                let category_display = document.getElementById('category') as HTMLHeadingElement;
                let cost_display = document.getElementById('cost') as HTMLParagraphElement;
                let quantity_display = document.getElementById('quantity') as HTMLParagraphElement;
                let remaining_display = document.getElementById('remaining') as HTMLParagraphElement;
    
                items_list = document.getElementById('items_list') as HTMLHeadingElement;
                let cost_spec = document.getElementById('cost_spec') as HTMLHeadingElement;
                let total = document.getElementById('total') as HTMLHeadingElement;
                let total_big = document.getElementById('total_big') as HTMLHeadingElement;
                let codeInput = document.getElementById('codeInput') as HTMLHeadingElement;
            
    
                try {
                    const response = await fetch(`http://localhost:3000/api/products/${code}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    });
    
                    if (!response.ok) {
                        if(response.status === 404){
                            toast.error("Not Registered!");
                            throw new Error("Failed to fetch product");
                        }
                    }
    
                    const data = await response.json();
                    console.log("Fetched product", data);
    
                    // Display the fetched product information
                    if (item_display) item_display.textContent = `${data.name}`;
                    if (category_display) category_display.textContent = `${data.category}`;
                    if (cost_display) cost_display.textContent = `${data.price}`;
                    if (quantity_display) quantity_display.textContent = `${data.quantity}`;
                    if (remaining_display) remaining_display.textContent = `${data.inStock}`;
    
                    // Update the total items and the total price
                    total_items.push({
                        name: data.name,
                        price: data.price,
                        quantity: data.quantity,
                    });
    
                    // Update the UI with the new list of items
                    if (items_list) {
                        items_list.innerHTML = total_items.map(item => `${item.name}`).join(',');
                    }
    
                    product_count[code] = (product_count[code] || 0) + 1
    
                    // Update the specific cost and total price
                    if (cost_spec) cost_spec.textContent = `${data.price}`;
                    
                    // Add to the total and update the total display
                    real_total += data.price;  // Assuming price is a number
                    if (total) total.textContent = `${real_total}`;
                    if (total_big) total_big.textContent = `M${real_total}`;
    
                    if(codeInput) codeInput.value = '';
    
                } catch (e: any) {
                    console.log(e.message);
                }
            }, 300);
        }
    };

    

    if(!context){
        return <div>Loading...</div>
    }

    return (
        <div className="drop-shadow-[0_6px_6px_rgba(0.5,0.5,0.5,0.5)] border-slate-500 border-2 rounded-md m-5 p-5 bg-slate-600 grid grid-cols-5">
            <div className="border-slate-500 border-2 rounded-lg col-span-3">
                <div className="text-center">
                    <Link href="/transactions" className="text-xl font-semibold hover:text-3xl hover:text-blue-400">Transaction Info</Link>
                </div>
                <div className="grid grid-rows-2 h-fit">
                    <div className="grid grid-cols-2">
                        <div className="m-5 grid grid-rows-7 gap-3 text-xl">
                            <h3>Date:</h3>
                            <h3>Cost:</h3>
                            <h3>Total:</h3>
                            <h3>Amount Paid:</h3>
                            <h3>Change:</h3>
                            <h3>Item(s):</h3>
                        </div>
                        <div className="m-5">
                            <div className="grid grid-rows-7">
                                <h1 className="my-2 rounded-md bg-slate-500 text-xl font-bold px-2 w-full overflow-y-scroll">{formattedDate}</h1>
                                <h1 id="cost_spec" className="my-2 rounded-md bg-slate-500 text-2xl px-2 w-full">{}</h1>
                                <h1 id="total" className="my-2 rounded-md bg-slate-500 text-2xl px-2 w-full">{}</h1>
                                <input type="number" id="paid" className="my-2 rounded-md bg-slate-500 text-2xl px-2 w-full"/>
                                <h1 id="change" className="my-2 rounded-md bg-slate-500 text-2xl px-2 w-full">{}</h1>
                                <h1 id="items_list" className="h-20 w-full overflow-y-auto overflow-x-hidden my-2 row-span-2 rounded-md bg-slate-500 text-2xl px-2 break-words">{}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="m-5 border-2 border-slate-500 rounded-lg text-xl h-fill bg-slate-400 text-center">
                        <h1 className="text-center font-semibold">Cash Register</h1>
                        <div className="drop-shadow-[0_3px_3px_rgba(5,5,5,5)] grid grid-cols-2 gap-1">
                            <div id="total_change" className="border-2 border-black rounded-lg p-5 mx-5 my-12 text-3xl font-bold text-center bg-slate-500">Total:</div>
                            <div className="border-2 border-black rounded-lg p-5 mx-5 my-12 text-3xl font-bold text-center bg-slate-500">
                                <h1 id="total_big">M{0}</h1>
                            </div>
                        </div>
                        <button onClick={handleCashOut} className="drop-shadow-[0_3px_3px_rgba(20,20,20,20)] text-center text-3xl font-semibold border-2 border-dotted border-black rounded-xl px-10 py-2 bg-green-400 hover:bg-green-200">Cash Out</button>
                    </div>
                    <div className="grid grid-cols-2 pb-2">
                        <button onClick={handleReset} className="text-2xl text-center border-2 border-black rounded-lg mx-5 bg-white font-semibold hover:bg-blue-300 hover:text-3xl hover:text-blue-600">Reset</button>
                        <button onClick={logout} className="text-2xl text-center border-2 border-black rounded-lg mx-5 bg-red-700 font-bold hover:bg-red-500 hover:text-3xl hover:text-red-200">Logout</button>
                    </div>
                </div>
            </div>
            <div className="mx-2 grid grid-rows-2 gap-2 col-span-2">
                <div className=" border-slate-500 border-2 rounded-lg bg-gray-500">
                    <div className="text-center">
                        <Link href="/products" className="text-xl font-semibold hover:text-3xl hover:text-blue-400">Product Info</Link>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="m-5 grid grid-rows-6 gap-5 text-xl">
                            <h3>Code:</h3>
                            <h3>Item:</h3>
                            <h3>Category:</h3>
                            <h3>Cost:</h3>
                            <h3>Quantity:</h3>
                            <h3>Remaining:</h3>
                        </div>
                        <div className="m-5 grid grid-rows-6 text-xl">
                            <input id="codeInput" onChange={(e) => prod(e.target.value)} type="number" name="code" title="code" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full" autoFocus/>
                            <h1 id="item" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full">{}</h1>
                            <h1 id="category" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full">{}</h1>
                            <h1 id="cost" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full">{}</h1>
                            <h1 id="quantity" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full">{}</h1>
                            <h1 id="remaining" className="my-2 rounded-md bg-gradient-to-l from-slate-500 to-slate-400 text-2xl px-2 w-full">{}</h1>
                        </div>
                    </div>
                </div>
                <div className=" border-slate-500 border-2 rounded-lg bg-slate-400">
                    <div className="text-center">
                        <Link href="/users" className="text-xl font-semibold hover:text-3xl hover:text-blue-500">Cashier Info</Link>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="m-5 grid grid-rows-4 gap-5 text-xl">
                            <h3>Username:</h3>
                            {/* <h3>Full Name:</h3> */}
                            <h3>Transactions processed:</h3>
                            <h3>Previous User:</h3>
                            <h3>Login Time:</h3>
                            {/* <h3>Duration:</h3> */}
                        </div>
                        <div className="m-5 grid grid-rows-4 gap-1">
                            <h1 className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full p-2">{username}</h1>
                            {/* <h1 className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full p-2">{}</h1> */}
                            <h1 id="transactions_processed" className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full p-2">{0}</h1>
                            <h1 className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full p-2">{previousUser}</h1>
                            <h1 className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full p-2">{loginTime}</h1>
                            {/* <input type="text" className="my-2 rounded-md bg-gradient-to-r from-slate-500 to-slate-400 text-2xl px-2 w-full"/> */}
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={handleCashOut} className="drop-shadow-[0_3px_3px_rgba(10,10,10,10)] border-2 border-black border-dotted bg-blue-400 rounded-md mb-2 p-1 px-3 text-3xl">Close Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}