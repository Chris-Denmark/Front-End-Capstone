import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import "./Collection.css"
import { useParams, useHistory } from "react-router-dom"

export const CollectionDetail = () => {
  const { getCollectionById, deleteCollection } = useContext(collectionContext)

	const [collection, setCollection] = useState({})

	const {collectionId} = useParams();
	const history = useHistory();

  const handleDelete = () => {
    deleteCollection(collection.id)
      .then(() => {
        history.push("/collections")
      })
  }
  
  useEffect(() => {
    console.log("useEffect", collectionId)
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    })
    }, [])

  return (
    <section className="collection">
      <h3 className="collection__name">{collection.name}</h3>
      <button onClick={handleDelete}>Delete Collection</button>
      <button onClick={() => {
          history.push(`/collections/edit/${collection.id}`)
      }}>Edit</button>
    </section>
  )
}