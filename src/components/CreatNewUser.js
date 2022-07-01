import React from "react"
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {Button, TextField} from "@mui/material";
import '../App.css';
import {theme} from "./main/ProgressBar";



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
        <form className="createNewUser">
            <h1 style={{alignSelf:'center'}}>Create account</h1>
            <div className="inputs">
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
            <Button theme={theme}
                variant="outlined" color="success" style={{alignSelf:'self-start'}}
                    onClick={register}>
                Success
            </Button>
        </form>
        </>
    )
}