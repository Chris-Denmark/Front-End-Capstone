import React, { useContext, useEffect, useState } from "react"
import "./Pops.css"
import { UserPopContext } from "./UserPopProvider"
import { CollectionContext } from "../collections/CollectionProvider"
import { useParams, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    maxHeight: 500,
    margin: 5
  },
  // media: {
  //   maxHeight:10000,
  //   maxWidth:10000
  // }
});
// Pop data is passed through this function to return a pop card that will display the information needed on the DOM.
export const Pop = ({ pop }) => {
  const classes = useStyles();
  const { addPop, deletePop, getUserPops } = useContext(UserPopContext)
  const { getCollectionById } = useContext(CollectionContext)
  const { collectionId } = useParams()
  const history = useHistory()
  const [collection, setCollection] = useState({})

  const handleSavePop = () => {
    getCollectionById(collectionId)
    .then(
    addPop({
      title: pop.title,
      imageName: pop.imageName,
      collectionId: parseInt(collectionId)
    }))
    .then(() => history.push("./"))
  }

  const handleDeletePop = () => {  
    deletePop(pop.id)
    .then(() => {
      refreshCollection()
    })
  }

  const refreshCollection = () => {
    getCollectionById(collectionId)
    .then((response) => {
      setCollection(response)
    }).then(
      getUserPops()
    )
  }

  return (
    

    <Card className={classes.root}>
      <CardActionArea style={{maxHeight:"350px",maxWidth:"500px"}}>
        <CardMedia 
        style={{ height: "auto", width:"auto", maxHeight: "300px", maxWidth:"300px"}}
        component="img"
        alt={pop.title}
        // className={classes.media}
        image={pop.imageName}
        title={pop.title}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{ maxWidth: "500px", margin: "5px"}}>
          {pop.title}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions>
        {pop.id 
        ? 
        <Button onClick={handleDeletePop} size="small" color="primary">
        Delete Pop From Collection
        </Button>
        :
        <Button onClick={handleSavePop}>Add Pop To Collection</Button>
      }
      </CardActions>
    </Card>
)}