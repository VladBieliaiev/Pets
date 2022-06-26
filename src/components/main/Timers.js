import React, {useEffect, useState} from "react";
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {ProgressBar} from "./ProgressBar";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";


let walkingInterval = null;
let eatInterval = null;



export const Timers = () =>{
    const [ walking, setWalking ] = useState(0);
    const [ eat, setEat ] = useState(0);
    const [ timesBetweenWalking, setTimesBetweenWalking ] = useState({
        walkingTimesBetween1: 0,
        walkingTimesBetween2: 0,
        walkingTimesBetween3: 0,
    })
    const [ timesBetweenEating, setTimesBetweenEating ] = useState({
        eatingTimesBetween1: 0,
        eatingTimesBetween2: 0,
        eatingTimesBetween3: 0,
    })

    const dataRef = collection(db,"petData")

    useEffect(()=>{
    const getPetsData = async () =>{
        const data = await getDocs(dataRef);
        setTimesBetweenWalking(prevState => {
            return{
                ...prevState,
                walkingTimesBetween1: (data.docs[0].data().secondWalking - data.docs[0].data().firstWalking) * 36000,
                walkingTimesBetween2: (data.docs[0].data().thirdWalking - data.docs[0].data().secondWalking) * 36000,
                walkingTimesBetween3: ((24 - data.docs[0].data().thirdWalking) + (data.docs[0].data().firstWalking) * 36000),
            }
        })
        // setTimesBetweenEating(prevState => {
        //     return {
        //         ...prevState,
        //         eatingTimesBetween1: (data.docs[0].data()),
        //         eatingTimesBetween2: 0,
        //         eatingTimesBetween3: 0,
        //     }
        // })
    }
        getPetsData();
    },[])


    useEffect(()=>{
        eatInterval = setInterval(()=>{
            setEat(prevState => prevState + 1)
        },timesBetweenWalking.walkingTimesBetween2)
        if(eat === 100){
            clearInterval(eatInterval)
        }
        return ()=> clearInterval(eatInterval);
    },[eat])

    useEffect(()=>{
        walkingInterval = setInterval(() => {
            setWalking(prevState => prevState + 1)
        }, 90)
        if(walking === 100){
            clearInterval(walkingInterval)
        }
        return () => clearInterval(walkingInterval);
    },[walking])


    return (
        <>
            <div>
                <h1>{walking}</h1>
                <ProgressBar props={walking}/>
                {walking > 5 ? <PetsIcon style={{color:"pink",fontSize:"2rem"}} onClick={() => setWalking(0)}>toilet</PetsIcon> : null}
                <h1>{eat}</h1>
                <ProgressBar props={eat}/>
                {eat > 5 ? <RestaurantMenuIcon style={{color:"pink",fontSize:"2rem"}} onClick={() => setEat(0)}>Eat</RestaurantMenuIcon> : null}
            </div>
        </>
    )
}

