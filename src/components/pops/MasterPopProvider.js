import React, { useState, createContext } from "react"

export const MasterPopContext = createContext()

export const MasterPopProvider = (props) => {
  const [pops, setPops] = useState([])
  
  const getMasterPops = () => {
    return fetch("http://localhost:8087/pops")
    .then(res => res.json())
    .then(setPops)
  }

  const getMasterPopsSearch = async (query) => {
    return fetch(`http://localhost:8087/pops?q=${query}`)
    .then(res => res.json())
    .then(setPops)
  }

return (
  <MasterPopContext.Provider value={{
    pops, getMasterPops, getMasterPopsSearch
  }}>
    {props.children}
  </MasterPopContext.Provider>
)
}