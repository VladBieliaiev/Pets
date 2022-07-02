import React, {useEffect} from "react";
import { useState} from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {Button, TextField} from "@mui/material";
import {CreatNewUser} from "./CreatNewUser";
import {AddPet} from "./Addpet";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';




export const LogIn = () =>{
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const [ registerForm, setRegisterForm ] = useState(false)
    const [ addPetForm, setAddPetForm ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ notFount, setNotFound] = useState("")

    const [ userEmail, setUserEmail ] = useState('false')
    const auth = getAuth();
    const curentU = auth.currentUser;


    let navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth,(currentU) =>{
            if(currentU) {
                setUserEmail(currentU.email)
                navigate('/main');
            }
            else{
                navigate('/')
            }
        })
    }, [userEmail])

    const logIn = async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
            setNotFound("")
            setLoginEmail('')
            setLoginPassword('')

        }catch(error){
            setNotFound("user notFound")

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
        return <>
        <form className="inputsSection">
            <h1 style={{alignSelf:'center'}}>Login </h1>
            <div className="inputs">
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
            <div className="buttons">
            <Button variant="outlined" color="success"
                    onClick={logIn}>
                Success
            </Button>
            <Button variant="outlined"
                    onClick={create}>Creat a new User</Button>
            <Button variant="outlined"
                    onClick={addPet}>Add Pets</Button>
            </div>
            <h1 style={{alignSelf:'center', color:'darkred'}}>{notFount}</h1>
            {registerForm ? <CreatNewUser/> : null}
            {addPetForm ? <AddPet/> : null}



        </form>
        </>
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