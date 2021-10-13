import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

///////////////////////////////////////////////////////
// responsible for fetching the recipe data from the forkify API
export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Recipe not Found! 😟 --> ${data.message.slice(0, -1)} (${
          response.status
        })`
      );
    }

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
