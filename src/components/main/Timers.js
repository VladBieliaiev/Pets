import React, {useEffect, useState} from "react";
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {ProgressBar} from "./ProgressBar";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import dog1 from "../../content/Spec_indicator_good.svg";
import dog2 from "../../content/Spec_indicator_fail.svg";
import {Tooltip, Zoom} from "@mui/material";
import { styled } from '@mui/material/styles';



let walkingInterval = null;
let eatInterval = null;



export const Timers = () =>{
    const [ dogState, setDogState ] = useState(dog1);
    const [ dogState2, setDogState2 ] = useState(dog2);
    const [ walking, setWalking ] = useState(0);
    const [ walkingIntervalMil, setWalkingIntervalMil ] = useState(1000);
    const [ eat, setEat ] = useState(0);
    const [ petsData, setPetsData] = useState([]);

    const [ walkingHours, seTWalkingHours ] = useState({
        walkingTimes1: 0,
        walkingTimes2: 0,
        walkingTimes3: 0,
    })
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
    // const [ timesBetweenEating, setTimesBetweenEating ] = useState({
    //     eatingTimesBetween1: 0,
    //     eatingTimesBetween2: 0,
    //     eatingTimesBetween3: 0,
    // })

    const dataRef = collection(db,"petData")

    const time = new Date();
    const aHour = time.getHours();




    const getPetsData = async () =>{
        const data = await getDocs(dataRef)
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
    };



    const add = () =>{
        setWalking(b);
        setWalkingIntervalMil(a)
    }









    let a = null;
    let b = null

    useEffect(()=>{
    const currentProgress = () =>{
        // if((hoursLeftBeforeWalk.hoursLeftBeforeWalk3 + 24) < (hoursLeftBeforeWalk.hoursLeftBeforeWalk1 + 24) &&
        //     (hoursLeftBeforeWalk.hoursLeftBeforeWalk3 + 24) < (hoursLeftBeforeWalk.hoursLeftBeforeWalk2 + 24)){
            a = quantityHoursBetweenWalking.quantityHoursBetweenWalking3_1 * 36000;
            b = 100 - Math.floor(100 / quantityHoursBetweenWalking.quantityHoursBetweenWalking3_1 *
                hoursLeftBeforeWalk.hoursLeftBeforeWalk1);
        // }
    }
        currentProgress();
    },[]);


    useEffect(()=>{
        getPetsData();
        add();
        console.log('b = ' + b);
    },[]);


    useEffect(()=>{
        walkingInterval = setInterval(() => {
            setWalking(prevState => prevState + 1)
        }, walkingIntervalMil / 100)
        if(walking === 100){
            clearInterval(walkingInterval)
        }
        return () => clearInterval(walkingInterval);
    },[walking])

    useEffect(()=>{
        eatInterval = setInterval(()=>{
            setEat(prevState => prevState + 1)
        },100)
        if(eat === 100){
            clearInterval(eatInterval)
        }
        return ()=> clearInterval(eatInterval);
    },[eat])



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
      }
    `;

    return (
        <>
            <h1>{b}</h1>
            <h1>{petsData.name}</h1>
            <div className='timerPage'>
                <div className="petsImg">
                <StyledTooltip TransitionComponent={Zoom}
                         title={`Hello! my name is ${petsData.name}
                                 i am ${petsData.age} years old`}
                         placement="top"
                         arrow>
                    {walking > 50 ? <img src={dogState2} alt="" style={{width: "9rem", height:"9rem", margin:"1rem"}}/> :
                        <img src={dogState} alt="" style={{width: "9rem", height:"9rem", margin:"1rem"}}/>}
                </StyledTooltip>
                </div>
                {/*<ProgressBar props={walking}/>*/}
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

