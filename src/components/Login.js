import React from "react";
import { useState} from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase";
import {Button, TextField} from "@mui/material";
import {CreatNewUser} from "./CreatNewUser";
import {AddPet} from "./Addpet";
import {LoggedUserInfo} from "./main/LoggedUserInfo";
import {Link, useHistory} from "react-router-dom";




export const LogIn = () =>{
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const [ registerForm, setRegisterForm ] = useState(false)
    const [ addPetForm, setAddPetForm ] = useState(false)
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


    const create = () =>{
        setRegisterForm(!registerForm)
    }
    const addPet = () =>{
        setAddPetForm(!addPetForm)
    }


    if(!user) {
        return <form >
            <Link to='/main'><Button>Main page</Button></Link>
            <h1 >Login </h1>
            <div>
                <TextField
                    d="outlined-basic"
                    label="Email..."
                    type="text"
                    onChange={(e)=>setLoginEmail(e.target.value)}/>
                <TextField
                    d="outlined-basic"
                    label="Password..."
                    type="password"
                    onChange={(e)=>setLoginPassword(e.target.value)}/>
            </div>
            <Button variant="outlined" color="success" style={{ marginTop:"1rem"}}
                    onClick={logIn}>
                Success
            </Button>
            <Button variant="outlined" style={{margin:"1rem 0 0 1rem"}}
                    onClick={create}>Creat a new User</Button>
            <Button variant="outlined" style={{margin:"1rem 0 0 1rem"}}
                    onClick={addPet}>Add Pets</Button>

            {registerForm ? <CreatNewUser/> : null}
            {addPetForm ? <AddPet/> : null}



        </form>
    } else {
        return <>
            <Link to='/main'><Button>Main page</Button></Link>
            <h2>Logged User : <p style={{color:"green"}}>{user.email}</p></h2>
            <Button variant="outlined" color="error" style={{width:"6rem"}}
                    onClick={logOut}>
                Logout
            </Button>
        </>
    }
}