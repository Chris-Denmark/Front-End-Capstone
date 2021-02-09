import React, { useContext, useEffect } from "react"
import "./Pops.css"
import { UserPopContext } from "./UserPopProvider"
import { CollectionContext } from "../collections/CollectionProvider"
import { useParams, useHistory } from "react-router-dom"

export const Pop = ({ pop }) => {
  const { addPop, deletePop, getUserPops } = useContext(UserPopContext)
  const { getCollectionById } = useContext(CollectionContext)
  const { collectionId } = useParams()
  const history = useHistory()

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
      history.push(`/collections/detail/${collectionId}`)
    })
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