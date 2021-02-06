import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CollectionContext = createContext()

// This component establishes what data can be used.
export const CollectionProvider = (props) => {
    const [collections, setCollections] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getCollections = (userId) => {
        return fetch(`http://localhost:8088/collections?userId=${userId}`)
        .then(res => res.json())
        .then(setCollections)
    }

    const getCollectionById = (id) => {
        return fetch(`http://localhost:8088/collections/${id}`)
            .then(res => res.json())
    }

    const addCollection = collectionObj => {
        return fetch("http://localhost:8088/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionObj)
        })
        .then(getCollections)
    }

    const deleteCollection = collectionId => {
        return fetch(`http://localhost:8088/collections/${collectionId}`, {
            method: "DELETE"
        })
            .then(getCollections)
    }

    const updateCollection = collection => {
        return fetch(`http://localhost:8088/collections/${collection.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(collection)
        })
          .then(getCollections)
      }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CollectionContext.Provider value={{
            collections, getCollections, addCollection, getCollectionById, deleteCollection, updateCollection, searchTerms, setSearchTerms
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}