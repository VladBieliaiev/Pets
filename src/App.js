import './App.css';
import React, {useEffect} from "react";
import {LogIn} from "./components/Login";
// import { PetData } from "./components/Addpet";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink, Router, BrowserRouter,Routes,
} from 'react-router-dom';
import {Timers} from "./components/main/Timers";
import {useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Main} from "./components/Main";
import {Contact} from "./routerTest/Contact";
import {NotFound} from "./routerTest/NotFound";
import {Navigation} from "./routerTest/Navigation";


function App () {


    return (
            <div className="AppStyle">
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<LogIn />}/>
                        <Route path='/main' element={<Main />}/>
                        {/*<Timers />*/}
                        {/*<AddPet/>*/}
                        {/*<Timers />*/}
                    </Routes>
                </BrowserRouter>
            </div>
    )
}

export default App;
