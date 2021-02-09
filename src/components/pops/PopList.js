import React, { useContext, useEffect, useState } from "react"
import { UserPopContext } from "./UserPopProvider"
import { Pop } from "./PopCard"
import "./Pops.css"
import { useHistory } from "react-router-dom"


export const UserPopList = () => {
  const { pops, getUserPops, deletePop } = useContext(UserPopContext)

  const history = useHistory()

  useEffect(() => {
    getUserPops()
  },[])
  
  return (
    <>
      <h1>Pops</h1>
      <div className="userPops">
      {
        pops.map(pop => {
          return <Pop key={pop.id} pop={pop} />
        })
      }
      </div>
    </>
  )
}