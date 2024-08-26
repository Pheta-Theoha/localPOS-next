// import { prisma } from '@lib/prisma';
import { useState, useEffect } from "react";

export default async function Admin() {

    interface Transaction {
        amount_paid: Number;
        change: Number;
        userId: String;
        productId: String;
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

    const [clickedUser, setClickedUser] = useState<User>();
    const [clickedProduct, setClickedProduct] = useState<Product>();
    const [clickedTransactions, setClickedTransactions] = useState<Transaction>();

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const handleUser = (user: any) => {
        setClickedUser(() => user);
        console.log(clickedUser);
    }

    const handleProduct = (product: any) => {
        setClickedProduct(() => product);
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
        <div className="drop-shadow-[0_6px_6px_rgba(0.5,0.5,0.5,0.5)] border-slate-500 border-2 rounded-md m-5 p-3 bg-slate-500 grid grid-rows-3">
            <div className="row-span-2 grid grid-cols-3 gap-2">
                <div className="border-2 border-slate-400 rounded-md overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-600 text-center justify-center text-3xl font-semibold">Products</h1>
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
                <div className="border-2 border-slate-400 rounded-md overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-600 text-center justify-center text-3xl font-semibold">Transactions</h1>
                    <div className="">
                        <ul className="m-3 text-xl">
                            {transactions.map((transaction: Transaction, index: any) => (
                                <li key={index}>
                                    <button className="font-semibold" onClick={() => handleTransaction(transaction)}>{transaction.createdAt}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>            
                <div className="border-2 border-slate-400 rounded-md overflow-y-scroll">
                    <h1 className="sticky top-0 bg-slate-600 text-center justify-center text-3xl font-semibold">Users</h1>
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
            <div className="border-2 border-dotted border-slate-400 rounded-lg my-2 h-64">
                <h1 className="text-center text-3xl font-semibold italic">More Information</h1>
                <div className="grid grid-cols-3 gap-3">
                    <div className="m-2 border-2 border-double border-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">Product</h1>
                        <div className="grid grid-rows-4 p-3">
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Name:</h1>
                                <h1 className="text-xl font-bold">{clickedProduct?.name}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Price(M):</h1>
                                <h1 className="text-xl font-bold">{clickedProduct?.price?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Quantity:</h1>
                                <h1 className="text-xl font-bold">{clickedProduct?.quantity?.toString()}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">In Stock:</h1>
                                <h1 className="text-xl font-bold">{clickedProduct?.inStock?.toString() }</h1>
                            </div>
                        </div>
                    </div>
                    <div className="m-2 border-2 border-double border-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">Transaction</h1>
                        <div className="grid grid-rows-4 p-3">
                            <h1 className="text-xl font-bold">Date:</h1>
                            <h1 className="text-xl font-bold">Cashier:</h1>
                            <h1 className="text-xl font-bold">Items:</h1>
                            <h1 className="text-xl font-bold">Cash:</h1>
                        </div>
                    </div>
                    <div className="m-2 border-2 border-double border-slate-400 rounded">
                        <h1 className="text-2xl text-center font-semibold">User</h1>
                        <div className="grid grid-rows-4 p-3">
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Username:</h1>
                                <h1 className="text-xl font-bold">{clickedUser?.username}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 className="text-xl font-bold">Role:</h1>
                                <h1 className="text-xl font-bold">{clickedUser?.role}</h1>
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