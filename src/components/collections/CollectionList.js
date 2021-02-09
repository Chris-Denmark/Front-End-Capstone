import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import { Collection } from "./CollectionCard"
import "./Collection.css"
import { useHistory } from "react-router-dom"

// renders the list of collections
export const CollectionList = () => {
  const { collections, getCollections } = useContext(CollectionContext)

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
          return <Collection key={collection.id} collection={collection} />  // maps over collections that are given from CollectionContext and runs them through the Collection function to generate collection cards.
        })
      }
        <button onClick={() => history.push("/collections/create")}>
          Create Collection
        </button>
      </div>
    </>
  )
}