import React, {useEffect, useState} from "react"
import { db } from "../firebase"
import { collection, getDocs, addDoc, deleteDoc, doc  } from "firebase/firestore"
import "../App.css"
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";

export const PetData = () =>{
    const [ pets, setPets ] = useState([]);
    const petsCollectionRef = collection(db, "petData")

    const [ newPetName, setNewPetName ] = useState('')
    const [ newPetAge, setNewPetAge ] = useState(0)
    const [ newPetGender, setNewPetGender ] = useState('')

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
                gender: newPetGender
            });
            console.log(newPet)
        }catch (error){
            console.log(error)
        }
        getPets();
    }

    const deletePet = async (id) =>{
        const petData = doc(db,"pet",id);
        await deleteDoc(petData);
    }

    return (
        <>
            <Button variant="outlined" color="success"
                    style={{margin: "1rem 0", width:"6rem"}}
                    onClick={addPet}>Add pet</Button>
            <div style={{display:"flex", marginTop:"1rem" }}>
                <TextField d="outlined-basic"
                           placeholder="Name..."
                            onChange={(e)=>setNewPetName(e.target.value)}/>
                <TextField d="outlined-basic"
                           type="number"
                           placeholder="Age..."
                            onChange={(e)=>setNewPetAge(e.target.value)}/>
            </div>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={(e)=>setNewPetGender(e.target.value)}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
            <div className="petsInfoBlock">
                {pets.map((i)=>{
                    return (
                        <div key={i.id} style={{display:"flex", flexDirection:"column"}}>
                            <span style={{marginLeft:"1rem"}}> name: {i.name} </span>
                            <span style={{marginLeft:"1rem"}}> age: {i.age}</span>
                            <span style={{marginLeft:"1rem"}}> gender: {i.gender}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}