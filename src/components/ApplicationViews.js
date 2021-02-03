import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { CollectionProvider } from "./collections/CollectionProvider"
import { CollectionList } from "./collections/CollectionList"
import { CollectionForm } from "./collections/CollectionForm"
import { CollectionDetail } from "./collections/CollectionDetail"

export const ApplicationViews = () => {
  return (
    <>
      {
        <Route exact path="/">
          <Home />
        </Route>

      }
    </>
  )
}