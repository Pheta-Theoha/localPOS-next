import Link from "next/link"
import Login from "./_components/Login"
import { Toaster } from "react-hot-toast"

export default function Home(){
  console.log("Working")
  return (
    <div className="">
      <Login />
    </div>
  )
}