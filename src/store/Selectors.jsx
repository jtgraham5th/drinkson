import { createSelector } from "reselect";

const getState = (state) => state;

// General getters
export const getDrinks = createSelector(getState, (state) => state?.drinks || []);
export const getUsers = createSelector(getState, (state) => state?.users || []);
export const getOffers = createSelector(getState, (state) => state?.offers || []);
export const getDrinkSizes = createSelector(getState, (state) => state?.sizes || []);
export const getCartDrinks = createSelector(getState, (state) => state?.drinks || []);
export const getFavoriteDrinks = createSelector(getState, (state) => state?.drink_ids || []);
export const getDrinkCategories = createSelector(getState, (state) => state?.categories || []);
export const getDrinkIngredients = createSelector(getState, (state) => state?.ingredients || []);

// More specific getters
export const getDrink = (id) =>
  createSelector(
    getDrinks,
    (drinks) => drinks.find((drink) => parseInt(drink.id) === parseInt(id))
  );

export const getUser = (id) =>
  createSelector(
    getUsers,
    (users) => users.find((user) => parseInt(user.id) === parseInt(id))
  );

  export const getOffersById = (id) =>
  createSelector(
    getOffers,
    (offers) => offers.find((offer) => offer.id === parseInt(id))
  );

