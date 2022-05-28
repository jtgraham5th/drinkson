import { Store } from "pullstate";

const FavoriteStore = new Store({
  total: 0,
  drink_ids: [],
});

export default FavoriteStore;

export const addToFavorites = (drinkID) => {
  FavoriteStore.update((s) => {
    if (s.drink_ids.find((id) => id === parseInt(drinkID))) {
      s.drink_ids = s.drink_ids.filter((id) => id !== parseInt(drinkID));
    } else {
      s.drink_ids = [...s.drink_ids, parseInt(drinkID)];
    }
  });
};
