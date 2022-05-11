import { Store } from 'pullstate';

const DrinkSizeStore = new Store({

	sizes: [
		{
            id: 1,
            name: "Small"
        },
        {
            id: 2,
            name: "Medium",
        },
        {
            id: 3,
            name: "Large"
        }
	]
});

export default DrinkSizeStore;