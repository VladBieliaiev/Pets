import React from "react";

export const PetData = ({pets}) =>{


    return (
        <div className="petsInfoBlock">
            {pets.map((i)=>{
                return (
                    <div key={i.id} style={{display:"flex", flexDirection:"column"}}>
                        <span style={{marginLeft:"1rem"}}> name: {i.name} </span>
                        <span style={{marginLeft:"1rem"}}> age: {i.age}</span>
                        <span style={{marginLeft:"1rem"}}> gender: {i.gender}</span>
                        <span style={{marginLeft:"1rem"}}> N1: {i.firstWalking}</span>
                        <span style={{marginLeft:"1rem"}}> N2: {i.secondWalking}</span>
                        <span style={{marginLeft:"1rem"}}> N2: {i.thirdWalking}</span>
                    </div>
                )
            })}
        </div>
    )
}