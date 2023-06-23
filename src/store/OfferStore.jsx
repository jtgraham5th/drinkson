import { Store } from 'pullstate';

const OfferStore = new Store({
  offers: [
    {
      id: 1,
      title: "Buy one get one free!",
      description: "Any time you buy a drink using your loyalty card scheme, you can get one free",
      image: "https://images.pexels.com/photos/861090/pexels-photo-861090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      id: 2,
      title: "10% off on weekends",
      description: "Get 10% off on all drinks during weekends",
      image: "https://images.pexels.com/photos/1236707/pexels-photo-1236707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      id: 3,
      title: "Happy Hour Special",
      description: "Enjoy discounted prices on selected drinks during our happy hour",
      image: "https://images.pexels.com/photos/6994817/pexels-photo-6994817.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    // Add more offers here
  ]
});

export default OfferStore;
