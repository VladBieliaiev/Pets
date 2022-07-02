import React, {useEffect, useState} from "react";
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {ProgressBar} from "./ProgressBar";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import dog1 from "../../content/dog1normal.svg";
import dog2 from "../../content/dogsad.svg";
import {Tooltip, Zoom} from "@mui/material";
import { styled } from '@mui/material/styles';



let walkingInterval = null;
let eatInterval = null;



export const Timers = () =>{
    const [ dogState, setDogState ] = useState(dog1);
    const [ dogState2, setDogState2 ] = useState(dog2);
    const [ walking, setWalking ] = useState(0);
    const [ walkingIntervalMil, setWalkingIntervalMil ] = useState(1000);
    const [ eatingIntervalMs, setEatingIntervalMs ] = useState(1000);
    const [ eat, setEat ] = useState(0);
    const [ petsData, setPetsData] = useState([]);

    const [ quantityHoursBetweenWalking, setQuantityHoursBetweenWalking ] = useState({
        quantityHoursBetweenWalking1_2:0,
        quantityHoursBetweenWalking2_3: 0,
        quantityHoursBetweenWalking3_1: 0,
    });
    const [ hoursLeftBeforeWalk, setHoursLeftBeforeWalk ] = useState({
        hoursLeftBeforeWalk1: 0,
        hoursLeftBeforeWalk2: 0,
        hoursLeftBeforeWalk3: 0,
    })

    const [ quantityHoursBetweenFeeding, setQuantityHoursBetweenFeeding ] = useState({
        quantityHoursBetweenFeeding1_2: 0,
        quantityHoursBetweenFeeding2_3: 0,
        quantityHoursBetweenFeeding3_1: 0,
    });
    const [ hoursLeftBeforeFeeding, setHoursBeforeFeeding ] = useState({
        hoursLeftBeforeFeeding1: 0,
        hoursLeftBeforeFeeding2: 0,
        hoursLeftBeforeFeeding3: 0,
    });

    const dataRef = collection(db,"petData")

    const time = new Date();

    const getPetsData = async () =>{
        await getDocs(dataRef)
            .then(data => setPetsData(data.docs[0].data()))
        setQuantityHoursBetweenWalking(prevState => {
            return{
                ...prevState,
                quantityHoursBetweenWalking1_2: (petsData.secondWalking - petsData.firstWalking),
                quantityHoursBetweenWalking2_3: (petsData.thirdWalking - petsData.secondWalking),
                quantityHoursBetweenWalking3_1: ((24 - petsData.thirdWalking) + (petsData.firstWalking)),
            }
        })
        setHoursLeftBeforeWalk(prevState => {
            return{
                ...prevState,
                hoursLeftBeforeWalk1: petsData.firstWalking - time.getHours(),
                hoursLeftBeforeWalk2: petsData.secondWalking - time.getHours(),
                hoursLeftBeforeWalk3: petsData.thirdWalking - time.getHours() ,
            }
        })
        setQuantityHoursBetweenFeeding(prevState => {
            return{
                ...prevState,
                quantityHoursBetweenFeeding1_2: (petsData.secondFeeding - petsData.firstFeeding),
                quantityHoursBetweenFeeding2_3: (petsData.thirdFeeding - petsData.secondFeeding),
                quantityHoursBetweenFeeding3_1: ((24 - petsData.thirdFeeding) + petsData.firstFeeding),
            }
        })
        setHoursBeforeFeeding(prevState => {
            return{
                ...prevState,
                hoursLeftBeforeFeeding1: petsData.firstFeeding - time.getHours(),
                hoursLeftBeforeFeeding2: petsData.secondFeeding - time.getHours(),
                hoursLeftBeforeFeeding3: petsData.thirdFeeding -time.getHours(),
            }
        })
    };



    let a = null;
    let walkingProcess = null;
    let eatingProcess = null
    let b = null;


        const currentWalkingProgress = () =>{
            if (time.getHours() > petsData.firstWalking && time.getHours() < petsData.secondWalking) {
                a = quantityHoursBetweenWalking.quantityHoursBetweenWalking1_2 * 36000;
                walkingProcess = 100 - Math.floor(100 / quantityHoursBetweenWalking.quantityHoursBetweenWalking1_2 *
                    hoursLeftBeforeWalk.hoursLeftBeforeWalk2);
            }
            if(time.getHours() > petsData.secondWalking && time.getHours() < petsData.thirdWalking){
                a = quantityHoursBetweenWalking.quantityHoursBetweenWalking2_3 * 36000;
                walkingProcess = 100 - Math.floor(100 / quantityHoursBetweenWalking.quantityHoursBetweenWalking2_3 *
                    hoursLeftBeforeWalk.hoursLeftBeforeWalk3);
            }
            if(time.getHours() > petsData.thirdWalking || time.getHours() < petsData.firstWalking){
                a = quantityHoursBetweenWalking.quantityHoursBetweenWalking3_1 * 36000;
                walkingProcess = 100 - Math.floor(100 / quantityHoursBetweenWalking.quantityHoursBetweenWalking3_1 *
                    hoursLeftBeforeWalk.hoursLeftBeforeWalk1)
            }
        }

        const currentFeedingProgress = () =>{
            if(time.getHours() > petsData.firstFeeding && time.getHours() < petsData.secondFeeding){
                b = quantityHoursBetweenFeeding.quantityHoursBetweenFeeding1_2 * 36000;
                eatingProcess = 100 - Math.floor(100 / quantityHoursBetweenFeeding.quantityHoursBetweenFeeding1_2 *
                    hoursLeftBeforeFeeding.hoursLeftBeforeFeeding2)
            }
            if(time.getHours() > petsData.secondFeeding && time.getHours() < petsData.thirdFeeding){
                b = quantityHoursBetweenFeeding.quantityHoursBetweenFeeding3_1 * 36000;
                eatingProcess = 100 - Math.floor(100 / quantityHoursBetweenFeeding.quantityHoursBetweenFeeding2_3 *
                    hoursLeftBeforeFeeding.hoursLeftBeforeFeeding3)
            }
            if(time.getHours() > petsData.thirdFeeding || time.getHours() < petsData.firstFeeding){
                b = quantityHoursBetweenFeeding.quantityHoursBetweenFeeding3_1 * 36000;
                eatingProcess = 100 - Math.floor(100 / quantityHoursBetweenFeeding.quantityHoursBetweenFeeding3_1 *
                    hoursLeftBeforeFeeding.hoursLeftBeforeFeeding1);
            }
        }



    const refreshProgress = () =>{
        setWalkingIntervalMil(a);

        setEatingIntervalMs(b)
        setWalking(walkingProcess);
        setEat(eatingProcess);
    }


    useEffect(()=>{
        getPetsData();
        currentFeedingProgress();
        currentWalkingProgress();
        refreshProgress();
    },[]);




    useEffect(()=>{
        walkingInterval = setInterval(() => {
            setWalking(prevState => prevState + 1)
        },  walkingIntervalMil )
        if(walking === 100){
            clearInterval(walkingInterval);
        }
        return () => clearInterval(walkingInterval);
    },[walking])

    useEffect(()=>{
        eatInterval = setInterval(()=>{
            setEat(prevState => prevState + 1)
        },eatingIntervalMs )
        if(eat === 100){
            clearInterval(eatInterval)
        }
        return ()=> clearInterval(eatInterval);
    },[eat]);


//
    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))`
      & .MuiTooltip-tooltip {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        text-align: center;
        color: black;
        background: #f1ffeb;
        border-radius: 50%;
        opacity: 50%;
        width: 18rem;
        height: 10rem;
      };
    `;

    return (
        <>
            { eat > 50 ? <h3 className='petsInfo'>I want EAT! please...</h3> : null}
            { walking > 50 ? <h3 className='petsInfo'>I want to WALK! please...</h3> : null}
            <div className='timerPage'>
                <div className="petsImg">
                <StyledTooltip TransitionComponent={Zoom}
                         title={`Hello! my name is ${petsData.name}
                                 i am ${petsData.age} years old`}
                         placement="top"
                         arrow>
                    {walking > 50 || eat > 50 ? <img src={dogState2} alt="" style={{width: "17rem", height:"17rem", margin:"1rem"}}/> :
                        <img src={dogState} alt="" style={{width: "17rem", height:"17rem", margin:"1rem"}}/>}
                </StyledTooltip>
                </div>
                <div className='progressiveBars'>
                    <ProgressBar props={walking}/>
                    {walking > 5 ? <PetsIcon style={{color:"orange",fontSize:"2rem", marginBottom:'1rem'}} onClick={() => setWalking(0)}>toilet</PetsIcon> : null}
                    <ProgressBar props={eat}/>
                    {eat > 5 ? <RestaurantMenuIcon style={{color:"orange",fontSize:"2rem"}} onClick={() => setEat(0)}>Eat</RestaurantMenuIcon> : null}
                </div>
            </div>
        </>
    )
}

