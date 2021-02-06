import React from "react"
import "./Pops.css"

export const Pop = ({ pop }) => {
  return (
    <section className="pop">
      <img src={pop.imageName}></img>
      <h3 className="pop__name">
        {pop.title}
      </h3>
    </section>
)}