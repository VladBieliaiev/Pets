import React, {useState} from "react";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {Button} from "@mui/material";


export const LoggedUserInfo = () =>{
    const [ userEmail, setUserEmail ] = useState('')
    const auth = getAuth();
    const user = auth.currentUser;



    onAuthStateChanged(auth,(currentU) =>{
            if(currentU) {
                setUserEmail(currentU.email)
            }
        })

    const logOut = async () =>{
        await signOut(auth)
        setUserEmail(null)
    }

    console.log(userEmail)
    return(
        <>
            { user ? <>
                    <h2 style={{color:"green"}}>{userEmail}</h2>
                    <Button variant="outlined" color="error" style={{width:"6rem"}}
                            onClick={logOut}>
                        Logout
                    </Button>
                </>
                : null }
        </>
    )
}