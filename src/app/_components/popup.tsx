// import '../globals.css';

// export default function PopUp(){

//   const loginPopup = document.getElementById('loginPopup');
//   const loginButton = document.getElementById('loginButton');
//   const closeButton = document.getElementById('closeButton');

//   loginButton.addEventListener('click', function() {
//     loginPopup.style.display = 'block';
//   });

//   closeButton.addEventListener('click', function() {
//     loginPopup.style.display = 'none';
//   });

//   return (
//     <div>
//       <form id="popup" action="">
//         <input type="text" placeholder="Username" />
//         <input type="password" placeholder="Password" />
//         <input type="submit" value="Log In" />
//       </form>
//     </div>
//   );
// } 


import React, { FormEvent, useEffect, useRef } from 'react'; 
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css'; 
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
  
export default function PopupGfg(props: any){ 
  
  const router = useRouter();

  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if(props.isClicked == true){
      dialogRef.current?.showModal();
    }else {
      dialogRef.current?.close();
    }
  }, [props.isClicked]);

  const closeDialog = () => {
    dialogRef.current?.close();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>){


    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    const response = await fetch('http://localhost:3000/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    console.log(username, password)

    // router.push('/cashier')
    if(response.ok){
        toast.success("Logged In")
        router.push('/admin')
    }else{
        //Handle errors
        // router.push('/cashier')
        const errorMessage = await response.json()
        // console.log(errorMessage)
        toast.error(errorMessage.message)

        // console.log(response.statusText);
    }
}

  return( 
  <div> 
    <dialog className='bg-slate-400 rounded-lg' ref={dialogRef}>
      <button className='text-right text-5xl pl-2 hover:text-6xl hover:text-green-700' onClick={closeDialog}>x</button>
      <form className='text-center text-3xl' method="post" onSubmit={handleSubmit}>
        <input type="text" className='p-2 m-1 mx-5 border-2 border-dotted border-black rounded-md mx-2 bg-slate-300' name="username" placeholder="Username" autoFocus required/><br/>
        <input type="password" className='p-2 m-1 mx-5 border-2 border-dotted border-black rounded-md mx-2 bg-slate-300' name="password" placeholder='Password' required/><br/>
        <input type="submit" className='text-center border-2 border-black rounded-lg m-2 p-1 hover:text-4xl hover:bg-green-400' />
      </form>
    </dialog>
  </div> 
  ) 
};