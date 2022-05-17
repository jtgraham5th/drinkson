import { Store } from "pullstate";

const UserStore = new Store({
  users: [
    {
      id: 1,
      name: "Adam",
      image: "../userPhotos/m01.jpeg",
      favoriteDrink: "Rum and Coke",
      drinkScore: 25
    },
    {
      id: 2,
      name: "Benita",
      image: "/userPhotos/f01.jpeg",
      favoriteDrink: "Mascato",
      drinkScore: 40

    },
    {
      id: 3,
      name: "Chris",
      image: "/userPhotos/m02.webp",
      favoriteDrink: "Tequila",
      drinkScore: 0

    },
    {
      id: 4,
      name: "Daphney",
      image: "/userPhotos/f02.jpeg",
      favoriteDrink: "Margarita",
      drinkScore: 20
    },
    {
      id: 5,
      name: "Eric",
      image: "/userPhotos/m03.jpeg",
      favoriteDrink: "Long Island Ice Tea",
      drinkScore: 5

    },
    {
      id: 6,
      name: "Felicia",
      image: "/userPhotos/f03.jpeg",
      favoriteDrink: "Moscow Mule",
      drinkScore: 18

    },
    {
      id: 7,
      name: "George",
      image: "/userPhotos/m04.jpeg",
      favoriteDrink: "Beer",
      drinkScore: 30

    },
    {
      id: 8,
      name: "Helen",
      image: "/userPhotos/f04.webp",
      favoriteDrink: "Gin & Tonic",
      drinkScore: 10

    },
    {
      id: 9,
      name: "Issac",
      image: "/userPhotos/m05.jpeg",
      favoriteDrink: "Sex on the Beach",
      drinkScore: 40

    },

  ],
});

export default UserStore;
