import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import { Collection } from "./CollectionCard"
import "./Collection.css"
import { useHistory } from "react-router-dom"

export const CollectionList = () => {
  const { collections, getCollections, searchTerms } = useContext(CollectionContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredCollections, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getCollections()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = collections.filter(collection => collection.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(collections)
    }
  }, [searchTerms, collections])

  return (
    <>
      <h1>Collections</h1>
      <div className="collections">
      {
        filteredCollections.map(collection => {
          return <Collection key={collection.id} collection={collection} />
        })
      }
      </div>
    </>
  )
}