import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";




export const LoggedUserInfo = () =>{
    const [ userEmail, setUserEmail ] = useState("")
    const auth = getAuth();
    const user = auth.currentUser;

    let navigate = useNavigate();

    useEffect(()=>{
    onAuthStateChanged(auth,(currentU) =>{
            if(currentU) {
                setUserEmail(currentU)
            }
            else{
                navigate('/')
            }
        })
    }, [])

    const logOut = async () =>{
        await signOut(auth)
        setUserEmail(null)
    }


    return(
        <>
            { user ? <div className="loggedUserInfo">
                    <h2 >{userEmail.email}</h2>
                    <Button variant="outlined" color="error"
                            style={{width:"8rem", marginTop:'1rem'}}
                            onClick={logOut}>
                        Logout
                    </Button>
                </div>
                : null }
        </>
    )
}