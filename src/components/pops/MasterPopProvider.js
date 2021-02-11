import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MasterPopContext = createContext()

// This component provides the data for the pops from the master pop database.
export const MasterPopProvider = (props) => {
  const [pops, setPops] = useState([])

  const getMasterPopsSearch = (query) => {
    return fetch(`http://localhost:8087/pops?q=${query}`)
    .then(res => res.json())
    .then(setPops)
  }

return (
  <MasterPopContext.Provider value={{
    pops, getMasterPopsSearch
  }}>
    {props.children}
  </MasterPopContext.Provider>
)
}