import { Store } from "pullstate";

const DrinkStore = new Store({
  drinks: [
    {
      id: 1,
      name: "Martini",
      summary: "Classic Cocktail",
      extras: ["olive"],
      description:
        "A classic martini cocktail made with gin and dry vermouth. Served with an olive garnish.",
      price: "8.50",
      prices: [
        {
          size_id: 1,
          price: "8.50",
        },
        {
          size_id: 2,
          price: "10.50",
        },
        {
          size_id: 3,
          price: "12.50",
        },
      ],
      image:
      "https://images.pexels.com/photos/364376/pexels-photo-364376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 2,
      name: "Mojito",
      summary: "Refreshing Cocktail",
      extras: ["mint", "lime"],
      description:
        "A refreshing mojito cocktail made with white rum, fresh mint leaves, lime juice, and soda water.",
      price: "7.90",
      prices: [
        {
          size_id: 1,
          price: "7.90",
        },
        {
          size_id: 2,
          price: "9.50",
        },
        {
          size_id: 3,
          price: "11.20",
        },
      ],
      image:
        "https://images.pexels.com/photos/1647164/pexels-photo-1647164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 3,
      name: "Cosmopolitan",
      summary: "Sophisticated Cocktail",
      extras: ["vodka", "cranberry juice"],
      description:
        "A sophisticated cosmopolitan cocktail made with vodka, cranberry juice, triple sec, and lime juice.",
      price: "9.20",
      prices: [
        {
          size_id: 1,
          price: "9.20",
        },
        {
          size_id: 2,
          price: "11.50",
        },
        {
          size_id: 3,
          price: "13.80",
        },
      ],
      image:
        "https://images.pexels.com/photos/364376/pexels-photo-364376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: 4,
      name: "Old Fashioned",
      summary: "Classic Whiskey Cocktail",
      extras: ["whiskey", "sugar", "bitters"],
      description:
        "A classic old fashioned cocktail made with whiskey, sugar, and bitters. Served with an orange twist.",
      price: "10.50",
      prices: [
        {
          size_id: 1,
          price: "10.50",
        },
        {
          size_id: 2,
          price: "12.50",
        },
        {
          size_id: 3,
          price: "14.50",
        },
      ],
      image:
        "https://images.pexels.com/photos/3962174/pexels-photo-3962174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ],
});


export default DrinkStore;

export const addNewDrink = (newDrink) => {
  DrinkStore.update((s) => {
    if (!s.drinks.find((drink) => drink.id === newDrink.id)) {
      s.drinks = [...s.drinks, newDrink];
    }
  });
};
