import { useEffect } from "react";
import {
  getRecipesSuccess,
  getRecipies,
  getRecipiesFailure,
} from "../state/recipesSlice";
import { useDispatch, useSelector } from "react-redux";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import "../styles/recipies.css"

const Recipes = () => {
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.recipe.recipes);

  useEffect(() => {
    const getRecipeData = async () => {
      dispatch(getRecipies());
      try {
        const result = await fetch("https://dummyjson.com/recipes");
        const json = await result.json();
        dispatch(getRecipesSuccess(json.recipes));
      } catch (error) {
        dispatch(getRecipiesFailure(error));
      }
    };
    getRecipeData();
  }, [dispatch]);

  return (
    <div className="recipe-div">
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {recipeList.map(x=>(
       <> <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={x.image} />
        </ListItemAvatar>
        <ListItemText
          primary={x.name}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {x.cuisine}
              </Typography>
             
            </>
          }
        />
      </ListItem>
        <Divider variant="inset" component="li" /></>
      ))}
      
      
    </List>

   
    </div>
  );
};

export default Recipes;
