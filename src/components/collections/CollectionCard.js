import React from "react"
import "./Collection.css"
import { Link } from "react-router-dom"


export const Collection = ({ collection }) => {
  return (
    <section className="collection">
      <h3 className="collection__name">
        <Link to={`/collections/detail/${collection.id}`}>
          { collection.name }
        </Link>
      </h3>
    </section>
)}