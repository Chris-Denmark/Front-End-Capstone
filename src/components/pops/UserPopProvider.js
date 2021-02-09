import React, { useState, createContext } from "react"

export const UserPopContext = createContext()

// This provides the functions for interacting with pops to add/delete them from a collection. As well as, getting pops from user collections and sending them to the relevant components.
export const UserPopProvider = (props) => {
    const [pops, setPops] = useState([])

    const getUserPops = () => {
        return fetch(`http://localhost:8088/pops?_expand=collection`)
        .then(res => res.json())
        .then(setPops)
    }

    const getPopById = (id) => {
        return fetch(`http://localhost:8088/pops/${id}`)
            .then(res => res.json())
    }

    const addPop = popObj => {
        return fetch(`http://localhost:8088/pops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(popObj)
        })
    }
    
    const deletePop = popId => {
        return fetch(`http://localhost:8088/pops/${popId}`, {
            method: "DELETE"
        })
        
    }

    return (
        <UserPopContext.Provider value={{
            pops, getUserPops, addPop, getPopById, deletePop
        }}>
            {props.children}
        </UserPopContext.Provider>
    )
}