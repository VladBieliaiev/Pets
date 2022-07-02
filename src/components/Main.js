import React from "react"
import {Timers} from "./main/Timers";
import {LoggedUserInfo} from "./main/LoggedUserInfo";




export const Main = () =>{



    return (
        <div className="mainPage">
            <Timers />
            <LoggedUserInfo />
        </div>
    )
}