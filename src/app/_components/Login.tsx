'use client'

import Link from "next/link";
import { FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import "../globals.css"
import toast from "react-hot-toast";
import { UserContext } from "./userContext";

export default function Login(){
    
    const { setUsernameAndTime, username, loginTime } = useContext(UserContext);
    const router = useRouter();


    // useEffect(() => {
    //     signIn('auth0');
    // }, []);

    // return (
    //     <div className='grid h-screen w-screen place-items-center'>           
    //       <div className='mx-auto w-48 min-h-fit'>                 
    //             Welcome to my app           
    //       </div>       
    //     </div>
    // );

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        const response = await fetch('http://localhost:3000/api/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        console.log(username, password)

        // router.push('/cashier')
        if(response.ok){
            const loginTime = new Date().toLocaleTimeString();
            setUsernameAndTime(username, loginTime);
            toast.success("Logged In")
            router.push('/cashier')
        }else{
            //Handle errors
            // router.push('/cashier')
            const errorMessage = await response.json()
            // console.log(errorMessage)
            toast.error(errorMessage.message)

            // console.log(response.statusText);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-x-0 place-content-evenly h-screen text-center px-32 ">
            <div className="login py-40">
                <h1 className="drop-shadow-[0_6px_6px_rgba(10,10,10,10)] text-center text-6xl text-amber-600 font-semibold italic">Lepolankeng</h1>
                <h3 className="text-4xl text-amber-200 italic font-semibold">Snack Bar</h3>
            </div>
            <div className="border-2 border-transparent bg-gradient-to-r from-slate-400 to-slate-900 py-10 px-5">
                <form method="post" onSubmit={handleSubmit} className="grid grid-rows-2 gap-0">
                    <h1 className="text-3xl font-semibold pb-5">Login</h1>
                    <input type="text" name="username" placeholder="Username" className="mx-10 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" autoFocus required/><br/>
                    <input type="password" name="password" placeholder="Password" className="mx-10 text-3xl text-white font-semibold bg-gradient-to-l from-slate-500 via-slate-600 to-slate-900 border-2 border-transparent rounded-xl py-3 px-2 w-full md:w-auto" required/><br/>
                    <input type="submit" value="Submit" className="text-3xl border-2 border-dotted border-white rounded-lg py-2 mx-20 text-center hover:bg-slate-300 hover:text-green-500 hover:font-semibold hover:border-amber-500"/><br/>
                    <Link href="/change" className="text-xl text-blue-400 underline hover:text-2xl hover:text-white">Forgot Password</Link>
                </form>
            </div>
        </div>
    );
}