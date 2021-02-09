import React, { useContext, useEffect, useState } from "react"
import "./Pops.css"
import { UserPopContext } from "./UserPopProvider"
import { CollectionContext } from "../collections/CollectionProvider"
import { useParams, useHistory } from "react-router-dom"

// Pop data is passed through this function to return a pop card that will display the information needed on the DOM.
export const Pop = ({ pop }) => {
  const { addPop, deletePop, getUserPops } = useContext(UserPopContext)
  const { getCollectionById } = useContext(CollectionContext)
  const { collectionId } = useParams()
  const history = useHistory()
  const [collection, setCollection] = useState({})

  const handleSavePop = () => {
    getCollectionById(collectionId)
    .then(
    addPop({
      title: pop.title,
      imageName: pop.imageName,
      collectionId: parseInt(collectionId)
    }))
    .then(() => history.push("./"))
  }

  const handleDeletePop = () => {  
    deletePop(pop.id)
    .then(() => {
      refreshCollection()
    })
  }

  const refreshCollection = () => {
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    }).then(
      getUserPops()
    )
  }

  return (
    <section className="pop">
      <img src={pop.imageName}></img>
      <h3 className="pop__name">
        {pop.title}
      </h3>
      {pop.id ? <button onClick={handleDeletePop}>Delete Pop From Collection</button> : <button onClick={handleSavePop}>Add Pop To Collection</button>}
    </section>
)}