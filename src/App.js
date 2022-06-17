// import './App.css';
import React from "react";
import './components/SingIn'
import {LogIn} from "./components/Login";
import {PetData} from "./components/petData";
import {AppStyle} from "./App.css"



function App () {

    return (
        <div className="AppStyle">
            <LogIn/>
            {/*<PetData/>*/}
            {/*<SingIn/>*/}
        </div>
    )
}

export default App;
