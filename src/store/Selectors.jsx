import { createSelector } from "reselect";

const getState = (state) => state;

//  General getters
export const getDrinks = createSelector(getState, (state) => state.drinks);
export const getUsers = createSelector(getState, (state) => state.users);
export const getOffers = createSelector(getState, (state) => state.offers);
export const getDrinkSizes = createSelector(getState, (state) => state.sizes);
export const getCartDrinks = createSelector(
  getState,
  (state) => state.drinks
);
export const getFavoriteDrinks = createSelector(
  getState,
  (state) => state.drink_ids
);
export const getDrinkCategories = createSelector(getState, (state) => state.categories);
export const getDrinkIngredients = createSelector(getState, (state) => state.ingredients);

//  More specific getters
export const getDrink = (id) =>
  createSelector(
    getState,
    (state) => state.drinks.filter((c) => parseInt(c.id) === parseInt(id))[0]
  );
export const getUser = (id) =>
  createSelector(
    getState,
    (state) => state.users.filter((c) => parseInt(c.id) === parseInt(id))[0]
  );
