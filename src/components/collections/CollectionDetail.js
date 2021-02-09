import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import { Pop } from "../pops/PopCard"
import "./Collection.css"
import { UserPopContext } from "../pops/UserPopProvider"
import { useParams, useHistory, Link } from "react-router-dom"

export const CollectionDetail = () => {
  const { getCollectionById, deleteCollection } = useContext(CollectionContext)
  const { pops, getUserPops } = useContext(UserPopContext)
  console.log(pops)

	const [collection, setCollection] = useState({})

	const {collectionId} = useParams();
  console.log(collectionId)
	const history = useHistory();

  const handleDelete = () => {
    deleteCollection(collection.id)
      .then(() => {
        history.push("/collections")
      })
  }
  
  useEffect(() => {
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    }).then(
      getUserPops()
    )
    }, [])

    let thing = pops?.filter(p => p.collectionId == collectionId)

  return (
    <section className="collection">
      <h3 className="collection__name">{collection.name}</h3>
      <button onClick={handleDelete}>Delete Collection</button>
      <button onClick={() => {
          history.push(`/collections/edit/${collection.id}`)
      }}>Edit</button>
      <button>
        <Link to={`/collections/detail/${collection.id}/popSearch`}>
          Add to Collection
        </Link>
      </button>
      <div className="userPops">
      {
        thing?.map(p => {
          return <Pop key={p.id} pop={p} />
        })
      }
      </div>
    </section>
  )
}


// pops?.map((p) => {
//   const filteredPops = pops.filter((pf) => pf.collectionId === collectionId)
//   console.log(filteredPops)
//   return <Pop key={filteredPops.id} pop={filteredPops} />
// })