import * as model from './model';
import recipeView from './views/recipeView';

// Pollyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const message = document.querySelector('.recipe .message');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////////////////
// Loading Recipe Data from API -- Async/Await
const controlRecipes = async function () {
  try {
    //  getting recipe id
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // render loading spinner before recipe is loaded
    recipeView.renderSpinner();

    // 1) loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe in Application
    recipeView.render(model.state.recipeData);
  } catch (error) {
    console.error(`⛔ ${error} ⛔`);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// This 👇 same as that 👆 but cleaner
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// This app uses The Model-View-Controller (MVC) Architecture pattern to separate the different components of the App (the Business Logic, the State, the HTTP Library, the Application Logic[Router], and the Presentation Logic [UI Layer]).

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
