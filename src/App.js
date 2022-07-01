import './App.css';
import React, {useEffect} from "react";
import {LogIn} from "./components/Login";
import {Route, BrowserRouter, Routes, useNavigate,} from 'react-router-dom';
import {useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Main} from "./components/Main";
import {auth, db} from "./firebase";
import {collection, getDocs} from "firebase/firestore";


function App () {
    // const [ logedUser, setLogedUser ] = useState({})
    // const auth = getAuth();
    // const user = auth.currentUser;
    // // let navigateLog = useNavigate();
    // //
    // useEffect(()=>{
    //     onAuthStateChanged(auth,(currentU) =>{
    //         if(currentU) {
    //             setLogedUser(currentU)
    //             console.log(logedUser)
    //         }
    //         else{
    //             // navigateLog('/')
    //         }
    //     })
    // }, [logedUser])

    // useEffect(()=>{
    //    if(logedUser){
    //        navigateLog('/main');
       // }
    // },[])

    return (
            <div className="AppStyle">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LogIn />}/>
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
