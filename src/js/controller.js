// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../img/icons.svg'; // Parcel 2

// Pollyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// model
import * as model from './model';

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

// ----------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////
// Generic Loading Spinner function
const renderSpinner = function (parentEl) {
  const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);

  // look at css ('.spinner' selector properties) which makes it spin forever.
};

///////////////////////////////////////////////////////
// Loading Recipe Data from API -- Async/Await
const getRecipe = async function () {
  try {
    //  getting recipe id
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // render loading spinner before recipe is loaded
    renderSpinner(recipeContainer);

    // 1) loading Recipe
    // async function will return a promise that we then need to handle whenever we call that async function. 👇
    await model.loadRecipe(id);

    // 2) Rendering Recipe in Application
    const html = `
        <figure class="recipe__fig">
          <img src="${recipeData.image}" alt="${
      recipeData.title
    }" class="recipe__img" crossorigin />
          <h1 class="recipe__title">
            <span>${recipeData.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipeData.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipeData.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

       
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipeData.ingredients
            .map(ingredient => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
            })
            .join('')}

            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">0.5</div>
              <div class="recipe__description">
                <span class="recipe__unit">cup</span>
                ricotta cheese
              </div>
            </li>
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipeData.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${recipeData.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
  `;

    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', html);
  } catch (error) {
    console.error(`⛔ ${error} ⛔`);
  }
};

// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe);

// This 👇 same as that 👆 but cleaner
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, getRecipe)
);

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// This app uses The Model-View-Controller (MVC) Architecture pattern to separate the different components of the App (the Business Logic, the State, the HTTP Library, the Application Logic[Router], and the Presentation Logic [UI Layer]).

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
