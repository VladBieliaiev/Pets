import React from "react";
import { useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase";
import {Button, TextField} from "@mui/material";




export const LogIn = () =>{
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')
    const [ registerForm, setRegisterForm ] = useState(false)

    const [ user, setUser ] = useState(null)


    const logIn = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        }catch(error){
            console.log(error)
        }
    }

    const logOut = async () =>{
        await signOut(auth)
        setUser(null)
    }

    onAuthStateChanged(auth,(currentU) =>{
        if(currentU) {
            setUser(currentU)
        }
    })







    const register = async () =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            setRegisterEmail('');
            setRegisterPassword('');
            console.log(user)
        }catch (error){
            console.log(error)
        }
    }

    const create = () =>{
        setRegisterForm(!registerForm)
    }

    if(!user) {
        return <form >
            <h1 >Login </h1>
            <div>
                <TextField
                    d="outlined-basic"
                    label="Email..."
                    onChange={(e)=>setLoginEmail(e.target.value)}/>
                <TextField
                    d="outlined-basic"
                    label="Password..."
                    onChange={(e)=>setLoginPassword(e.target.value)}/>
            </div>
            <Button variant="outlined" color="success" style={{ marginTop:"1rem"}}
                    onClick={logIn}>
                Success
            </Button>
            <Button variant="outlined" style={{margin:"1rem 0 0 1rem"}}
                    onClick={create}>Creat a new User</Button>
            {registerForm ? <form>
                <h1 >Create account</h1>
                <div>
                    <TextField
                        d="outlined-basic"
                        label="Email..."
                        onChange={(e)=>setRegisterEmail(e.target.value)}/>
                    <TextField
                        d="outlined-basic"
                        label="Password..."
                        onChange={(e)=>setRegisterPassword(e.target.value)}/>
                </div>
                <Button variant="outlined" color="success" style={{ marginTop:"1rem"}}
                        onClick={register}>
                    Success
                </Button>
            </form> : null}
        </form>
    } else {
        return <>
            <h2>Logged User : <p style={{color:"green"}}>{user.email}</p></h2>
            <Button variant="outlined" color="error" style={{width:"6rem"}}
                    onClick={logOut}>
                Logout
            </Button>
        </>
    }
}