import './App.css';
import React from "react";
import {LogIn} from "./components/Login";
import {AddPet, PetData} from "./components/Addpet";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Timers} from "./components/main/Timers";



function App () {

    return (
        <div className="AppStyle">
            <LogIn/>
            <AddPet/>
            <Timers />
        </div>
    )
}

export default App;
