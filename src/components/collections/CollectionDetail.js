import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { CollectionContext } from "./CollectionProvider"
import { UserPopContext } from "../pops/UserPopProvider"
import { Pop } from "../pops/PopCard"
import "./Collection.css"
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// Responsible for rendering the details of a collection (e.g. the Edit, Add, and Delete buttons on the collection).
export const CollectionDetail = () => {
  const classes = useStyles();
  const { getCollectionById, deleteCollection } = useContext(CollectionContext) // getting the relevant functions from Collection Context which can be found in CollectionProvider.js.
  const { pops, getUserPops } = useContext(UserPopContext) // getting the relevant functions from UserPopContext which can be found in UserPopProvider.js.

	const [collection, setCollection] = useState({}) // Sets the state of collections.

	const {collectionId} = useParams(); // allows you to use the object id via the URL.
	const history = useHistory(); // Allows the user to go back to a previously viewed page.

  // handles deleting a collection then routing back to the collections page so the user sees the page without the deleted collection.
  const handleDelete = () => {
    deleteCollection(collection.id)
      .then(() => {
        history.push("/collections")
      })
  }
  
  // renders the page when an action is taken so collections and the pops inside them will render to the DOM.
  useEffect(() => {
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    }).then(
      getUserPops()
    )
    }, [])

    let thing = pops?.filter(p => p.collectionId == collectionId) // filters the pops by collectionId so that collections only show pops containing the correct collectionId.

  // returns JSX to display on the DOM.
  return (
    <section className="collection">
      <h3 className="collection__name">{collection.name}</h3>
      <button onClick={handleDelete}>Delete Collection</button>
      <button onClick={() => {
          history.push(`/collections/edit/${collection.id}`)
      }}>Edit</button>
      <div className="userPops">
      <Grid container
    direction="row"
    justify="center"
    alignItems="center">
      {
        thing?.map(p => {
          return <Pop key={p.id} pop={p} /> // maps over the array of pops that were filtered by collectionId and runs them through the Pop function to get the information from them that it should display.
        })
      }
      </Grid>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon onClick={() => history.push(`/collections/detail/${collection.id}/popSearch`)} /> {/*link for the Add To Collection button that when clicked takes the user to the popSearch page. */}
      </Fab>
      </div>
    </section>
  )
}