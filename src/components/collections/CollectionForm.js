import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "../collections/CollectionProvider"
import "./Collection.css"
import { useHistory, useParams } from 'react-router-dom';

export const CollectionForm = () => {
    const { addCollection, getCollectionById, updateCollection } = useContext(CollectionContext)

    const [collection, setCollection] = useState({
      name: ""
    })

    const [isLoading, setIsLoading] = useState(true);

    const { collectionId } = useParams();
	  const history = useHistory();

    const handleControlledInputChange = (event) => {
      const newCollection = { ...collection }
      newCollection[event.target.id] = event.target.value
      setCollection(newCollection)
    }

    const handleSaveCollection = () => {
        if (collectionId){
          updateCollection({
              id: collection.id,
              name: collection.name
          })
          .then(() => history.push(`/collections/detail/${collection.id}`))
        }else {
          addCollection({
              name: collection.name,
          })
          .then(() => history.push("/collections"))
        }
      }

    return (
      <form className="collectionForm">
        <h2 className="collectionForm__title">{collectionId ? "Edit Collection" : "Add Collection"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="collectionName">Collection name: </label>
            <input type="text" id="name" required autoFocus className="form-control"
            placeholder="Collection name"
            onChange={handleControlledInputChange}
            value={collection.name}/>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() 
            handleSaveCollection()
          }}>
        {collectionId ? "Save Collection" : "Add Collection"}</button>
      </form>
    )
}