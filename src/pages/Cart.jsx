import {
  IonBadge,
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { trashBin, checkbox } from "ionicons/icons";
import { useEffect, useState } from "react";
import { CartStore, DrinkStore } from "../store";
import { removeFromCart } from "../store/CartStore";
import { getCartDrinks, getDrinks } from "../store/Selectors";
import UserAvatar from "../components/UserAvatar";
import styles from "./Cart.module.scss";

const Cart = () => {
  const drinks = DrinkStore.useState(getDrinks);
  const cart = CartStore.useState(getCartDrinks);

  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCartProducts = () => {
      setCartProducts([]);
      setTotal(0);

      cart.forEach((drink) => {
        var drink_ID = drink.drinkID;
        var drinkSize_ID = parseFloat(drink.drinkSizeID);
        var forUser_ID = drink.forUser;
        const tempDrink = drinks.filter(
          (p) => parseInt(p.id) === parseInt(drink_ID)
        )[0];
        const tempPrice = tempDrink.prices[drinkSize_ID - 1].price;

        const newDrink = {};
        newDrink.id = tempDrink.id;
        newDrink.name = tempDrink.name;
        newDrink.image = tempDrink.image;
        newDrink.size = drinkSize_ID;
        newDrink.price = tempPrice;
        newDrink.forUser = forUser_ID;

        setTotal((prevTotal) => prevTotal + parseFloat(tempPrice));
        setCartProducts((prevSearchResults) => [
          ...prevSearchResults,
          newDrink,
        ]);
      });
    };

    getCartProducts();
  }, [cart, drinks]);

  const removeProductFromCart = (index) => {
    removeFromCart(index);
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((_, i) => i !== index)
    );
    setTotal((prevTotal) => prevTotal - cartProducts[index].price);
  };

  const showDrinkSize = (drinkSize) => {
    switch (drinkSize) {
      case 1:
        return <small>small</small>;
      case 2:
        return <small>medium</small>;
      case 3:
        return <small>large</small>;
      default:
        break;
    }
  };

  return (
    <IonPage id="cart-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: 'center' }}>Checkout</IonTitle>
        </IonToolbar>
        
      </IonHeader>

      <IonContent fullscreen>
        <IonRow className="ion-text-center ion-margin-top ion-margin-bottom">
          <IonCol size="12">
            <IonNote>
              {cartProducts && cartProducts.length}{" "}
              {cartProducts.length > 1 || cartProducts.length === 0
                ? " drinks"
                : " drink"}{" "}
              found
            </IonNote>
          </IonCol>
        </IonRow>

        <IonList>
          {cartProducts &&
            cartProducts.map((drink, index) => (
              <IonItemSliding className={styles.cartSlider} key={index}>
                <IonItem
                  lines="none"
                  detail={false}
                  className={styles.cartItem}
                >
                  <img alt="cart drink" src={drink.image} />
                  <IonLabel className="ion-padding-start ion-text-wrap">
                    <h4>{drink.name}</h4>
                  </IonLabel>
                  <IonLabel className="ion-padding-start ion-text-wrap">
                    {showDrinkSize(drink.size)}
                  </IonLabel>
                  {drink.forUser ? (
                    <UserAvatar userID={drink.forUser} />
                  ) : null}

                  <div className={styles.cartActions}>
                    <IonBadge color="dark">${drink.price}</IonBadge>
                  </div>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="main"
                    style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                    onClick={() => removeProductFromCart(index)}
                  >
                    <IonIcon icon={trashBin} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
        </IonList>
      </IonContent>

      <IonFooter className={styles.cartFooter}>
        <div className={styles.cartCheckout}>
          <IonCardSubtitle>${total.toFixed(2)}</IonCardSubtitle>

          <IonButton color="main">
            <IonIcon icon={checkbox} />
            <span style={{ marginTop: "-0rem" }}>&nbsp;Checkout</span>
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Cart;
