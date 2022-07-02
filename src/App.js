import './App.css';
import React from "react";
import {LogIn} from "./components/Login";
import {Route, BrowserRouter, Routes,} from 'react-router-dom';

import {Main} from "./components/Main";



function App () {


    return (
            <div className="AppStyle">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LogIn />}/>
                        <Route path='/main' element={<Main />}/>
                    </Routes>
                </BrowserRouter>
            </div>
    )
}

export default App;
