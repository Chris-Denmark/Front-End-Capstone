import React, { useState, createContext } from "react"

export const MasterPopContext = createContext()

export const MasterPopProvider = (props) => {
  
  const getMasterPops = (query) => {
    return fetch(`http://localhost:8087/pops?q=${query}`)
    .then(res => res.json())
    .then(setPops)
  }
}