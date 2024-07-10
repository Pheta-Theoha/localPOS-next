"use client"

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddUser(){
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const role = formData.get('role');
        const password = formData.get('password');

        const response = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, role, password })
        })
        console.log(username, role, password);

        router.push('../admin');
    }

    return (
        <div className="grid place-content-evenly h-screen text-center px-32 bg-gradient-to-r from-slate-400 to-red-900">
            <div className="drop-shadow-[0_6px_6px_rgba(10,10,10,10)] border-2 border-dotted bg-gradient-to-r from-slate-400 to-slate-900 py-10 px-5 rounded-xl">
                    <h1 className="text-3xl font-semibold pb-5">Register User</h1>
                <form method="post" onSubmit={handleSubmit} className="">
                    <div className="grid grid-cols-2">
                        <div className="grid m-2">
                            <input type="text" name="username" placeholder="Username" className="mx-10 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" required/><br/>
                            <select title="role" id="role" name="role" className="mx-10 mb-6 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" required>
                                <option value="Cashier" className="text-black bg-slate-400">Cashier</option>
                                <option value="Admin" className="text-black bg-slate-400">Admin</option>
                            </select>
                        </div>
                        <div className="grid m-2">
                            
                            {/* <input type="text" name="role" placeholder="Role" className="" required/><br/> */}
                            <input type="password" name="password" placeholder="Password" className="mx-10 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" required/><br/>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="mx-10 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" required/><br/>
                        </div>
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Register" className="text-3xl border-2 border-dotted border-white rounded-lg py-2 px-20 my-4 text-center hover:bg-slate-300 hover:text-green-500 hover:font-semibold hover:border-amber-500"/><br/>
                        <Link href="/admin" className="text-2xl text-blue-400 underline hover:text-2xl hover:text-white">Cancel Operation</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}