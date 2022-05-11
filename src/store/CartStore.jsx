import { Store } from "pullstate";

const CartStore = new Store({
  total: 0,
  drinks: []
});

export default CartStore;

export const addToCart = (newDrink) => {
  CartStore.update((s) => {
    s.drinks = [...s.drinks, newDrink];
    // s.drink_ids = [...s.drink_ids, `${parseInt(drinkID)}`];
  });
};

export const removeFromCart = (drinkIndex) => {
  CartStore.update((s) => {
    s.drinks.splice(drinkIndex, 1);
  });
};
