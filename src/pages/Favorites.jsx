import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import ViewDrinkCard from "../components/ViewDrinkCard";
import { DrinkStore, FavoriteStore } from "../store";
import {
  getDrinks,
  getFavoriteDrinks,
} from "../store/Selectors";

const Favorites = () => {
  const cartRef = useRef();
  const router = useIonRouter();

  const drinks = DrinkStore.useState(getDrinks);
  const favorites = FavoriteStore.useState(getFavoriteDrinks);

  const [searchResults, setSearchResults] = useState([]);
  const [amountLoaded, setAmountLoaded] = useState(6);

  useEffect(() => {
    const getFavorites = () => {
      setSearchResults([]);

      favorites.forEach((favorite) => {
        var drinkID = favorite;
        const tempDrink = drinks.filter(
          (c) => parseInt(c.id) === parseInt(drinkID)
        )[0];
        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          tempDrink,
        ]);
      });
    };

    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const fetchMore = async (e) => {
    //	Increment the amount loaded by 6 for the next iteration
    setAmountLoaded((prevAmount) => prevAmount + 6);
    e.target.complete();
  };

  return (
    <IonPage id="favorites-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>

          <IonButtons slot="end">
            <div
              ref={cartRef}
              className="button-container animate__animated"
              onClick={() => router.goBack()}
            ></div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol size="12">
              <IonNote>
                {searchResults && searchResults.length}{" "}
                {searchResults.length > 1 || searchResults.length === 0
                  ? " favorites"
                  : " favorite"}{" "}
                found
              </IonNote>
            </IonCol>
          </IonRow>

          <IonRow>
            {searchResults &&
              searchResults.map((drink, index) => {
                if (index <= amountLoaded) {
                  return (
                    <ViewDrinkCard
                      key={drink.id}
                      drink={drink}
                      cartRef={cartRef}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll threshold="100px" onIonInfinite={fetchMore}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Fetching more..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
