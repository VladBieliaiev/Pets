import React from "react"
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {Button, TextField} from "@mui/material";



export const CreatNewUser = () =>{
    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')

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


    return (
        <>
        <form>
            <h1 >Create account</h1>
            <div>
                <TextField
                    d="outlined-basic"
                    label="Email..."
                    type="text"
                    onChange={(e)=>setRegisterEmail(e.target.value)}/>
                <TextField
                    d="outlined-basic"
                    label="Password..."
                    type="password"
                    onChange={(e)=>setRegisterPassword(e.target.value)}/>
            </div>
            <Button variant="outlined" color="success" style={{ marginTop:"1rem"}}
                    onClick={register}>
                Success
            </Button>
        </form>
        </>
    )
}