import React, { useContext, useEffect, useState } from "react"
import { CollectionContext } from "./CollectionProvider"
import { Collection } from "./CollectionCard"
import "./Collection.css"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// renders the list of collections
export const CollectionList = () => {
  const classes = useStyles();
  const { collections, getCollections } = useContext(CollectionContext)

  const history = useHistory()

  useEffect(() => {
    getCollections()
  },[])
  
  return (
    <>
      <h1 className="collection__header">Collections</h1>
      <div className="collections">
      <Grid container
    direction="row"
    justify="center"
    alignItems="center">
      {
        collections.map(collection => {
          return <Collection key={collection.id} collection={collection} />  // maps over collections that are given from CollectionContext and runs them through the Collection function to generate collection cards.
        })
      }
      </Grid>
      </div>
      <div className={classes.root}>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon onClick={() => history.push("/collections/create")} />
        </Fab>
      </div>
    </>
  )
}