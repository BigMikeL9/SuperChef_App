import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipeData: {},
};

///////////////////////////////////////////////////////
// responsible for fetching the recipe data from the forkify API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);

    // changing property names of data Object
    const { recipe } = data.data;
    state.recipeData = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };

    console.log('Recipe Data 👨‍🍳 -->', state.recipeData);
  } catch (error) {
    console.error(`⛔ ${error} ⛔`);
  }
};
