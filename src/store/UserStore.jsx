import { Store } from "pullstate";

const UserStore = new Store({
  users: [
    {
      id: 1,
      name: "Adam",
      image: "https://picsum.photos/200"
    },
    {
      id: 2,
      name: "Benita",
      image: "https://picsum.photos/200"

    },
    {
      id: 3,
      name: "Chris",
      image: "https://picsum.photos/200"

    },
    {
      id: 4,
      name: "Daphney",
      image: "https://picsum.photos/200"
    }
  ],
});

export default UserStore;
