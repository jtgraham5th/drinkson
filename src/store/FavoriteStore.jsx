import { Store } from "pullstate";

const FavoriteStore = new Store({
  total: 0,
  coffee_ids: [],
});

export default FavoriteStore;

export const addToFavorites = (coffeeID) => {
  FavoriteStore.update((s) => {
    if (s.coffee_ids.find((id) => id === parseInt(coffeeID))) {
      s.coffee_ids = s.coffee_ids.filter((id) => id !== parseInt(coffeeID));
    } else {
      s.coffee_ids = [...s.coffee_ids, parseInt(coffeeID)];
    }
  });
};
