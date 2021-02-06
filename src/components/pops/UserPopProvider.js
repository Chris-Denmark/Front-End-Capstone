import React, { useState, createContext } from "react"

export const UserPopContext = createContext()

export const UserPopProvider = (props) => {
    const [pops, setPops] = useState([])

    const getUserPops = () => {
        return fetch("http://localhost:8088/pops")
        .then(res => res.json())
        .then(setPops)
    }

    const getPopById = (id) => {
        return fetch(`http://localhost:8088/pops/${id}`)
            .then(res => res.json())
    }

    const addPop = popObj => {
        return fetch(`http://localhost:8088/collections/pops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(popObj)
        })
        .then(getPops)
    }

    const deletePop = popId => {
        return fetch(`http://localhost:8088/pops/${popId}`, {
            method: "DELETE"
        })
            .then(getPops)
    }

    return (
        <UserPopContext.Provider value={{
            pops, getUserPops, addPop, getPopById, deletePop
        }}>
            {props.children}
        </UserPopContext.Provider>
    )
}