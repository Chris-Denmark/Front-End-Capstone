import React from "react"
import "./Pops.css"
import { Link } from "react-router-dom"


export const Pop = ({ pop }) => {
  return (
    <section className="pop">
      <a href src={pop.imageName}></a>
      <h3 className="pop__name">
        {pop.title}
      </h3>
    </section>
)}