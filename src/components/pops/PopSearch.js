import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MasterPopContext } from "./MasterPopProvider"
import { Pop } from "./PopCard"
import "./Pops.css"
import Grid from "@material-ui/core/Grid";

// This function is in charge of searching through the data that is returned from the master pops search function and displaying it so the user can pick a pop from it.
export const PopSearch = () => {
  const { pops, getMasterPopsSearch } = useContext(MasterPopContext)

  const [searchTerm, setSearchTerm] = useState({name: ''})
  const [count, setCount] = useState(0)
  const history = useHistory()



  const handleControlledInputChange = (event) => {
      const newInput = {...searchTerm}
      newInput[event.target.id] = event.target.value
    setSearchTerm(newInput)
  }

    useEffect(() => {
        if (count === 0) {
          getMasterPopsSearch("null")
        } else {
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
    <Grid container
    direction="row"
    justify="center"
    alignItems="center">
    {
      pops.map(pop => {
        return <Pop key={pop.handle + Math.random()} pop={pop} />
      })}
    </Grid>
   </> 
  )
}