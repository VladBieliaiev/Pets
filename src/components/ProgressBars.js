import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Box, CircularProgress, LinearProgress, Typography} from "@mui/material";




let toiletInterval = null;
let eatInterval = null;



export const Progress = () =>{
    const [ toilet, setToilet ] = useState(0);
    const [ eat, setEat ] = useState(0);
    const [ stop, setStop ] = useState(true);



    useEffect(()=>{
        eatInterval = setInterval(()=>{
            setEat(prevState => prevState + 1)
        },500)
        if(eat === 5){
            clearInterval(eatInterval)
        }

        return ()=> clearInterval(eatInterval);
    },[eat])

    useEffect(()=>{
        toiletInterval = setInterval(() => {
            setToilet(prevState => prevState + 1)
        }, 500)
        if(toilet === 4){
            clearInterval(toiletInterval)
        }
        return () => clearInterval(toiletInterval);
    },[toilet])


    return (
        <>
            <h1>{toilet}</h1>
            <button onClick={()=>setToilet(0)}>toilet</button>
            <h1>{eat}</h1>
            <button onClick={()=>setEat(0)}>Eat</button>
        </>
    )
}

