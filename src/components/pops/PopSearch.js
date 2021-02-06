import React, { useContext, useEffect, useState } from "react"
import { MasterPopContext } from "./MasterPopProvider"
import { Pop } from "./PopCard"
import "./Pops.css"
// import { useHistory } from "react-router-dom"

export const PopSearch = () => {
  const { pops, getMasterPopsSearch } = useContext(MasterPopContext)

  const [searchTerm, setSearchTerm] = useState({name: ''})
  const [count, setCount] = useState(0)



  const handleControlledInputChange = (event) => {
      const newInput = {...searchTerm}
      newInput[event.target.id] = event.target.value
    setSearchTerm(newInput)
  }

    useEffect(() => {
        if (count !== 0) {
            getMasterPopsSearch(searchTerm.name)
        }
    }, [count])

  return (
      <>
      <form className="PopForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="popName">Search: </label>
          <input type="text" id="name" required autoFocus className="form-control"
          placeholder="Search for a pop"
          onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault() 
            setCount(count + 1)
          }}>
        Search</button>
    </form>
    {
    pops.map(pop => {
          return <Pop key={pop.handle + Math.random()} pop={pop} />
        })}
   </> 
  )
}
