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
import {Progress} from "./components/ProgressBars";



function App () {

    return (
        <div className="AppStyle">
            {/*<LogIn/>*/}
            {/*<AddPet/>*/}
            <Progress/>
        </div>
    )
}

export default App;
