import React, {useState} from "react"
import {Timers} from "./main/Timers";
import {LoggedUserInfo} from "./main/LoggedUserInfo";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect} from "react";
import {db} from "../firebase";

export const Main = () =>{



    return (
        <div className="mainPage">
            <Timers />
            <LoggedUserInfo />
        </div>
    )
}