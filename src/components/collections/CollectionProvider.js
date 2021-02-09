import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CollectionContext = createContext()

// This component establishes what data can be used.
export const CollectionProvider = (props) => {
    const [collections, setCollections] = useState([])
    const user = localStorage.getItem("popinabox_user")

    const getCollections = () => {
        return fetch(`http://localhost:8088/collections?userId=${user}&_embed=pops`)
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

      return (
        <CollectionContext.Provider value={{
            collections, getCollections, addCollection, getCollectionById, deleteCollection, updateCollection
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}