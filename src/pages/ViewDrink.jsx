import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonIcon,
  useIonModal
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { bag, heart, caretBack, heartOutline } from "ionicons/icons";
import { useParams } from "react-router";
import { DrinkSizeStore, DrinkStore, FavoriteStore } from "../store";
import { addToCart } from "../store/CartStore";
import { addToFavorites } from "../store/FavoriteStore";
import { getDrink, getDrinkSizes, getFavoriteDrinks } from "../store/Selectors";
import styles from "./ViewDrink.module.scss";
import SendDrinkModal from "../components/SendDrinkModal";

const ViewDrink = (props) => {
  const router = useIonRouter();
  const params = useParams();
  const drink = DrinkStore.useState(getDrink(params.id));
  const favorites = FavoriteStore.useState(getFavoriteDrinks);
  const drinkSizes = DrinkSizeStore.useState(getDrinkSizes);
  const [selectedSize, setSelectedSize] = useState(false);

  const favoriteRef = useRef();
  const drinkCartRef = useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const [present, dismiss] = useIonModal(SendDrinkModal, {dismiss: () => dismiss()});
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [0, 0.2, 0.75, 1],
    initialBreakpoint: 0.75,
    backdropBreakpoint: 0.2
  }
  const getPrice = () =>
    drink.prices.filter(
      (p) => parseInt(p.size_id) === parseInt(selectedSize)
    )[0].price;

  useEffect(() => {
    const drinkID = params.id;
    const tempIsFavorite = favorites.find(
      (f) => parseInt(f) === parseInt(drinkID)
    );

    setIsFavorite(tempIsFavorite);
  }, [params.id, favorites]);

  const addDrinkToFavorites = (e, drinkID) => {
    e.preventDefault();
    addToFavorites(drinkID);

    favoriteRef.current.classList.add("animate__tada");

    setTimeout(() => {
      favoriteRef.current.classList.remove("animate__tada");
    }, 700);
  };

  const addDrinkToCart = (e, drinkID, selectedSize) => {
    e.preventDefault();
    e.stopPropagation();

    drinkCartRef.current.style.display = "";
    drinkCartRef.current.classList.add("animate__fadeOutUp");
    const newDrink = { drinkID: drinkID, drinkSizeID: selectedSize };
    setTimeout(() => {
      addToCart(newDrink);

      setTimeout(() => {
        drinkCartRef.current.style.display = "none";
      }, 500);
    }, 500);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar style={{ backgroundColor: "rgb(87, 13, 19)" }}>
          <IonButtons slot="start">
            <div className="button-container" onClick={() => router.goBack()}>
              <IonIcon icon={caretBack} className="gray-icon" size="large" />
            </div>
          </IonButtons>

          <IonTitle>{drink.name}</IonTitle>

          <IonButtons slot="end">
            <div
              ref={favoriteRef}
              className="button-container animate__animated"
              onClick={(e) => addDrinkToFavorites(e, drink.id)}
            >
              <IonIcon
                icon={isFavorite ? heart : heartOutline}
                size="large"
                className={isFavorite ? "yellow-icon" : "gray-icon"}
              />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="animate__animated animate__fadeIn">
          <IonRow className="search-container">
            <IonCol size="6">
              <IonCard className="drink-card">
                <img src={drink.image} alt="drink type" />
              </IonCard>
            </IonCol>

            <IonCol
              size="6"
              className="ion-margin-top ion-padding-top ion-padding-end"
            >
              {drink.description ? (
                <>
                  <IonCardSubtitle>Description</IonCardSubtitle>
                  <p>{drink.description}</p>
                </>
              ) : (
                <>
                  <IonCardSubtitle>Ingredients</IonCardSubtitle>
                  {drink.ingredients.map((ingredient,i) => (
                    <h6 key={i}>{ingredient}</h6>
                  ))}
                </>
              )}{" "}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonCardSubtitle className="custom-margin-left">
                Extras included
              </IonCardSubtitle>

              <IonRow>
                <IonCol size="4">
                  {drink.extras.map((extra, index) => {
                    return (
                      <IonBadge
                        key={`extra_${index}`}
                        className={styles.extra}
                        expand="block"
                        color="custom-light"
                      >
                        {extra}
                      </IonBadge>
                    );
                  })}
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="ion-padding">
              <IonCardSubtitle className="custom-margin-left">
                Pick your size
              </IonCardSubtitle>

              <IonRow>
                {drinkSizes.map((size) => {
                  return (
                    <IonCol key={size.id} size="4">
                      <IonButton
                        onClick={() => setSelectedSize(size.id)}
                        expand="block"
                        color={
                          size.id === selectedSize ? "main" : "custom-light"
                        }
                        fill={size.id === selectedSize ? "outline" : "solid"}
                      >
                        {size.name}
                      </IonButton>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter className={styles.checkout}>
        <div className={styles.checkoutDetails}>
          <div className={styles.priceDetails}>
            <IonCardSubtitle>Price</IonCardSubtitle>
            <h4>${selectedSize ? getPrice() : "0.00"}</h4>
          </div>
          <IonButton
            onClick={(e) => addDrinkToCart(e, drink.id, selectedSize)}
            disabled={!selectedSize}
            expand="block"
            color="main"
          >
            Add to cart
          </IonButton>
          <IonButton
            color="main"
            expand="block"
            onClick={() => present(modalOptions)}
          >
            <IonIcon size="small" icon={bag} />
            Send Drink
          </IonButton>

          <div
            ref={drinkCartRef}
            style={{ position: "absolute", display: "none", fontSize: "3rem" }}
            className="animate__animated"
          >
            <IonIcon icon={bag} className="yellow-icon" />
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ViewDrink;
