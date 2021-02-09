import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { CollectionContext } from "./CollectionProvider"
import { UserPopContext } from "../pops/UserPopProvider"
import { Pop } from "../pops/PopCard"
import "./Collection.css"

// Responsible for rendering the details of a collection (e.g. the Edit, Add, and Delete buttons on the collection).
export const CollectionDetail = () => {
  const { getCollectionById, deleteCollection } = useContext(CollectionContext) // getting the relevant functions from Collection Context which can be found in CollectionProvider.js.
  const { pops, getUserPops } = useContext(UserPopContext) // getting the relevant functions from UserPopContext which can be found in UserPopProvider.js.

	const [collection, setCollection] = useState({}) // Sets the state of collections.

	const {collectionId} = useParams(); // allows you to use the object id via the URL.
	const history = useHistory(); // Allows the user to go back to a previously viewed page.

  // handles deleting a collection then routing back to the collections page so the user sees the page without the deleted collection.
  const handleDelete = () => {
    deleteCollection(collection.id)
      .then(() => {
        history.push("/collections")
      })
  }
  
  // renders the page when an action is taken so collections and the pops inside them will render to the DOM.
  useEffect(() => {
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    }).then(
      getUserPops()
    )
    }, [])

    let thing = pops?.filter(p => p.collectionId == collectionId) // filters the pops by collectionId so that collections only show pops containing the correct collectionId.

  // returns JSX to display on the DOM.
  return (
    <section className="collection">
      <h3 className="collection__name">{collection.name}</h3>
      <button onClick={handleDelete}>Delete Collection</button>
      <button onClick={() => {
          history.push(`/collections/edit/${collection.id}`)
      }}>Edit</button>
      <button>
         <Link to={`/collections/detail/${collection.id}/popSearch`}> {/*link for the Add To Collection button that when clicked takes the user to the popSearch page. */}
          Add to Collection
        </Link> 
      </button>
      <div className="userPops">
      {
        thing?.map(p => {
          return <Pop key={p.id} pop={p} /> // maps over the array of pops that were filtered by collectionId and runs them through the Pop function to get the information from them that it should display.
        })
      }
      </div>
    </section>
  )
}