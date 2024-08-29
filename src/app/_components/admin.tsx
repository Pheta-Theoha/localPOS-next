// import { prisma } from '@lib/prisma';
import { useState, useEffect } from "react";

export default async function Admin() {

    interface Transaction {
        amount_paid: Number;
        change: Number;
        userId: String;
        products: String;
    }
    
    interface User {
        fullName: String;
        username: String;
        role: String;
        password: String;
    }

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
        cost_price: Number;
        stock_quantity: Number;
        unit_price: Number;
        inStock: Number;
    }

    const [clickedUser, setClickedUser] = useState<User>();
    const [clickedProduct, setClickedProduct] = useState<Product | Stock>();
    const [clickedStock, setClickedStock] = useState<Stock>();
    const [clickedTransactions, setClickedTransactions] = useState<Transaction>();

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const handleUser = (user: any) => {
        setClickedUser(() => user);
        console.log(clickedUser);
    }

    const handleProduct = (product: any) => {
        setClickedProduct(() => product);
    }

    const handleStock = (stock: any) => {
        setClickedStock(() => stock);
    }

    const handleTransaction = (transaction: any) => {
        setClickedTransactions(() => transaction);
    }

    useEffect(() => {
        const sample2 = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    cache: "force-cache"
                });

    
            if(!response.ok){
                throw new Error("Not Okay")
            }
        
            const data = await response.json();
            console.log("Fetched Products:", data);
            
            const products = data;
            setProducts(products);
            }catch(e: any){
                console.log(e.message);
            }
        }
        sample2();
    }, []);

    useEffect(() => {
        const fstock = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/stock/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    cache: "force-cache"
                });

    
            if(!response.ok){
                throw new Error("Not Okay")
            }
        
            const data = await response.json();
            console.log("Fetched Stock:", data);
            
            const stock = data;
            setStock(stock);
            }catch(e: any){
                console.log(e.message);
            }
        }
        fstock();
    }, []);
    
    useEffect(() => {
        const sample = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    // cache: "force-cache"
                });
        
                if(!response.ok){
                    throw new Error("Not Okay")
                }
            
                const data = await response.json();
                console.log("Fetched Users:", data);
                
                const users = data;
                setUsers(users);
            }catch(e: any){
                console.log(e.message);
            }
        }
        sample();
    }, []);

    useEffect(() => {
        const sample3 = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/transactions/', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    // cache: "force-cache"
                });
        
                if(!response.ok){
                    throw new Error("Not Okay")
                }
            
                const data = await response.json();
                console.log("Fetched Users:", data);
                
                const transactions = data;
                setTransactions(transactions);
            }catch(e: any){
                console.log(e.message);
            }
        }
        sample3();
    }, []);

    // console.log(users)

    return (
        <div className="drop-shadow-[0_6px_6px_rgba(0.5,0.5,0.5,0.5)] border-slate-500 border-2 rounded-md m-5 p-3 bg-slate-400 grid grid-rows-3">
            <div className="row-span-2 grid grid-cols-4 gap-2">
                <div className="border-2 border-slate-400 rounded-md bg-slate-300 h-[32rem] overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-300 text-center justify-center text-3xl font-semibold">Products</h1>
                    <div className="">
                        <ul className="m-3 text-xl">
                            {products.map((product: Product, index: any) => (
                                <li key={index}>
                                    <button className="font-semibold" onClick={() => handleProduct(product)}>{product.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-2 border-slate-400 rounded-md h-[32rem] bg-slate-300 overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-300 text-center justify-center text-3xl font-semibold">Stock</h1>
                    <div className="">
                        <ul className="m-3 text-xl">
                            {stock.map((stock: Stock, index: any) => (
                                <li key={index}>
                                    <button className="font-semibold" onClick={() => handleProduct(stock)}>{stock.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>            
                <div className="border-2 border-slate-400 rounded-md h-[32rem] bg-slate-300 overflow-x-scroll">
                    <h1 className="sticky top-0 bg-slate-300 text-center justify-center text-3xl font-semibold">Transactions</h1>
                    <div className="">
                        <ul className="m-3 text-xl">
                            {transactions.map((transaction: Transaction, index: any) => (
                                <li key={index}>
                                    <button className="font-semibold" onClick={() => handleTransaction(transaction)}>{transaction.createdAt.slice(0,-5)}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>            
                <div className="border-2 border-slate-400 rounded-md h-[32rem] bg-slate-300 overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-300 text-center justify-center text-3xl font-semibold">Users</h1>
                    <div className="">
                        <ul className="m-3 text-xl">
                            {users.map((user: User, index: any) => (
                                <li key={index}>
                                    <button className="font-semibold" onClick={() => handleUser(user)}>{user.username}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-2 border-dotted border-slate-400 bg-slate-300 rounded-lg my-2 h-64">
                <h1 className="text-center text-3xl font-semibold italic">More Information</h1>
                <div className="grid grid-cols-4">
                    <div className="m-2 border-2 border-double bg-slate-400 border-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">Product/Stock</h1>
                        <div className="grid grid-rows-4 p-3">
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Name:</h1>
                                <h1 className="text-xl">{clickedProduct?.name}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Price(M):</h1>
                                <h1 className="text-xl">{clickedProduct?.price?.toString()}{clickedStock?.cost_price?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Quantity:</h1>
                                <h1 className="text-xl">{clickedProduct?.quantity?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">In Stock:</h1>
                                <h1 className="text-xl">{clickedProduct?.inStock?.toString() }</h1>
                            </div>
                        </div>
                    </div>
                    <div className="m-2 border-2 border-double col-span-2 bg-slate-400 border-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">Transaction</h1>
                        <div className="grid grid-rows-4 p-3">
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Date:</h1>
                                <h1 className="text-xl">{clickedTransactions?.createdAt.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Cashier:</h1>
                                <h1 className="text-xl">{clickedTransactions?.userId?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Products:</h1>
                                <h1 className="text-xl">{clickedTransactions?.products?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Cash:</h1>
                                <h1 className="text-xl">{clickedTransactions?.amount_paid?.toString()}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="m-2 border-2 border-double border-slate-400 bg-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">User</h1>
                        <div className="grid grid-rows-4 p-3">
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Username:</h1>
                                <h1 className="text-xl">{clickedUser?.username}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Role:</h1>
                                <h1 className="text-xl">{clickedUser?.role}</h1>
                            </div>
                            <h1 className="text-xl font-bold">Logged In:</h1>
                            <h1 className="text-xl font-bold">Logged out:</h1>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}