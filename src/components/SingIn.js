// import React from "react";
// import { useState} from "react";
// import {Button, TextField} from "@mui/material";
// import {createUserWithEmailAndPassword, } from "firebase/auth";
// import {auth} from "../firebase";
//
//
// export const SingIn =() =>{
//     const [ registerEmail, setRegisterEmail ] = useState('')
//     const [ registerPassword, setRegisterPassword ] = useState('')
//     const [ registerForm, setRegisterForm ] = useState(false)
//
//
//
//     const register = async () =>{
//         try{
//             const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
//             console.log(user)
//         }catch (error){
//             console.log(error)
//         }
//     }
//
//     const create = () =>{
//         setRegisterForm(!registerForm)
//     }
//
//     return (
//         <div>
//             <Button variant="outlined" color="success" onClick={create}>Creat</Button>
//             {registerForm ? <form>
//                 <h1 >Create account</h1>
//                 <div>
//                     <TextField
//                         d="outlined-basic"
//                         label="Email..."
//                         onChange={(e)=>setRegisterEmail(e.target.value)}/>
//                     <TextField
//                         d="outlined-basic"
//                         label="Password..."
//                         onChange={(e)=>setRegisterPassword(e.target.value)}/>
//                 </div>
//                 <Button variant="outlined" color="success" style={{ marginTop:"1rem"}}
//                         onClick={register}>
//                     Success
//                 </Button>
//             </form> : null}
//
//         </div>
//     )
// }