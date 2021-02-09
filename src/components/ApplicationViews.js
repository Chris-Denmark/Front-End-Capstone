import React from "react"
import { Route } from "react-router-dom"
import { CollectionProvider } from "./collections/CollectionProvider"
import { CollectionList } from "./collections/CollectionList"
import { CollectionForm } from "./collections/CollectionForm"
import { CollectionDetail } from "./collections/CollectionDetail"
import { PopSearch } from "./pops/PopSearch"
import { MasterPopProvider } from "./pops/MasterPopProvider"
import { UserPopProvider } from "./pops/UserPopProvider"

export const ApplicationViews = () => {
  return (
    <>
      <MasterPopProvider>
        <UserPopProvider>
          <CollectionProvider>
            <Route exact path="/">

              <CollectionList />
            </Route>

            <Route exact path="/collections">
              <CollectionList />
            </Route>

            <Route path="/collections/create">
              <CollectionForm />
            </Route>

            <Route path="/collections/edit/:collectionId(\d+)">
              <CollectionForm />
            </Route>

            <Route exact path="/collections/detail/:collectionId(\d+)">
              <CollectionDetail />
            </Route>

            <Route exact path="/collections/detail/:collectionId(\d+)/popSearch">
              <PopSearch />
            </Route>
          </CollectionProvider>
        </UserPopProvider>
      </MasterPopProvider>


    </>
  )
}