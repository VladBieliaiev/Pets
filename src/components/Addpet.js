import React, {useEffect, useState} from "react"
import { db } from "../firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"
import "../App.css"
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";


export const AddPet = () =>{
    const [ pets, setPets ] = useState([]);
    const petsCollectionRef = collection(db, "petData")

    const [ newPetName, setNewPetName ] = useState('')
    const [ newPetAge, setNewPetAge ] = useState(0)
    const [ newPetGender, setNewPetGender ] = useState('')
    const [ firstWalking, setFirstWalking ] = useState(0)
    const [ secondWalking, setSecondWalking ] = useState(0)
    const [ thirdWalking, setThirdWalking ] = useState(0)
    const [ firstFeeding, setFirstFeeding ] = useState(0);
    const [ secondFeeding, setSecondFeeding ] = useState(0)
    const [ thirdFeeding, setThirdFeeding ] = useState(0)

    const getPets = async () =>{
        const data = await getDocs(petsCollectionRef)
        setPets(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    useEffect(()=>{
        getPets();
    },[]);

    const addPet = async () =>{
        try{
            const newPet = await addDoc(petsCollectionRef, {
                name: newPetName,
                age: newPetAge,
                gender: newPetGender,
                firstWalking: Number(firstWalking),
                secondWalking: Number(secondWalking),
                thirdWalking: Number(thirdWalking),
                firstFeeding: Number(firstFeeding),
                secondFeeding: Number(secondFeeding),
                thirdFeeding: Number(thirdFeeding),
            });
            console.log(newPet)
        }catch (error){
            console.log(error)
        }
        getPets();
    }



    return (
        <>
            <div className='addPet'>
                <h1 style={{alignSelf:'center'}}>Fill your pet info...</h1>
                <div className="inputs">
                    <TextField d="outlined-basic"
                               label="Pets Name..."
                               type="text"
                               onChange={(e)=>setNewPetName(e.target.value)}/>
                    <TextField d="outlined-basic"
                               label="Pets Age..."
                               type="number"
                               onChange={(e)=>setNewPetAge(e.target.value)}/>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom:'1rem',display:'flex',flexDirection:"column"}}>
                        <TextField d="outlined-basic"
                                   label="First Walk"
                                   type="number"
                                   onChange={(e)=>setFirstWalking(e.target.value)}
                        />
                        <TextField d="outlined-basic"
                                   label="Second Walk"
                                   type="number"
                                   onChange={(e)=>setSecondWalking(e.target.value)}
                        />
                        <TextField d="outlined-basic"
                                   label="Third Walk"
                                   type="number"
                                   onChange={(e)=>setThirdWalking(e.target.value)}
                        />
                    </div>
                    <div style={{marginBottom:'1rem',display:'flex',flexDirection:"column"}}>

                        <TextField d="outlined-basic"
                                   label="First Feeding"
                                   type="number"
                                   onChange={(e)=>setFirstFeeding(e.target.value)}
                        />
                        <TextField d="outlined-basic"
                                   label="Second Feeding"
                                   type="number"
                                   onChange={(e)=>setSecondFeeding(e.target.value)}
                        />
                        <TextField d="outlined-basic"
                                   label="Third FeedingFeeding"
                                   type="number"
                                   onChange={(e)=>setThirdFeeding(e.target.value)}
                        />
                    </div>
                </div>

                <FormControl className='radioInput'>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{fontSize:"1.2rem"}}>Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        className="inputs"
                        onChange={(e)=>setNewPetGender(e.target.value)}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
                <Button variant="outlined" color="success"
                        style={{margin: "1rem 0", width:"6rem"}}
                        onClick={addPet}>Add pet</Button>
            </div>

            {/*<PetData pets={pets}/>*/}
        </>
    )
}