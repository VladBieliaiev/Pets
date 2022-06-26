import React from "react"
import {Timers} from "./main/Timers";
import {LoggedUserInfo} from "./main/LoggedUserInfo";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export const Main = () =>{


    return (
        <>
            <LoggedUserInfo />
            <Timers/>
            <Link to='/'><Button>Login page</Button></Link>
        </>
    )
}