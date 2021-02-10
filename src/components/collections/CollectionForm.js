import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "../collections/CollectionProvider"
import "./Collection.css"
import { useHistory, useParams } from 'react-router-dom';

// the form for creating/editing a collection.
export const CollectionForm = () => {
    const { addCollection, getCollections, getCollectionById, updateCollection } = useContext(CollectionContext)
    const user = localStorage.getItem("popinabox_user") // grabs the localStorage userId.

    const [collection, setCollection] = useState({
      name: ""
    })

    const [isLoading, setIsLoading] = useState(true); // sets isLoading to true.

    const { collectionId } = useParams();
	  const history = useHistory();

    // 
    const handleControlledInputChange = (event) => {
      const newCollection = { ...collection }
      newCollection[event.target.id] = event.target.value
      setCollection(newCollection)
    }

    // handles when a collection is saved/updated.
    const handleSaveCollection = () => {
        if (collectionId){
          updateCollection({
              id: collection.id,
              name: collection.name,
              userId: parseInt(user)
          })
          .then(() => history.push(`/collections/detail/${collection.id}`))
        }else {
          addCollection({
              name: collection.name,
              userId: parseInt(user),
          })
          .then(() => history.push("/collections"))
        }
      }

      // runs once the page is rendered. Gets collections then determines, based on if the collectionId exists, the forms render with edit buttons instead of save buttons.
      useEffect(() => {
        getCollections().then(() => {
          if (collectionId) {
            getCollectionById(collectionId)
            .then(collection => {
                setCollection(collection)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])

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