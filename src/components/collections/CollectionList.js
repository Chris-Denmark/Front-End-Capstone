import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import { Collection } from "./CollectionCard"
import { CollectionForm } from "./CollectionForm"
import "./Collection.css"
import { useHistory } from "react-router-dom"


export const CollectionList = () => {
  const { collections, getCollections, searchTerms } = useContext(CollectionContext)

  const history = useHistory()

  useEffect(() => {
    getCollections()
  },[])
  
  return (
    <>
      <h1>Collections</h1>
      <div className="collections">
      {
        collections.map(collection => {
          return <Collection key={collection.id} collection={collection} />
        })
      }
        <button onClick={() => history.push("/collections/create")}>
          Create Collection
        </button>
      </div>
    </>
  )
}