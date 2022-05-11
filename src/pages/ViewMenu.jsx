import {
  IonButtons,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonIcon,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { searchSharp } from "ionicons/icons";
import { useRef, useState } from "react";
import { bag ,caretBackCircle } from "ionicons/icons";
import { useParams } from "react-router";
import ViewDrinkCard from "../components/ViewDrinkCard";
import { CartStore, DrinkStore } from "../store";
import { getDrinks, getCartDrinks } from "../store/Selectors";
import "./Home.module.scss";

const ViewMenu = (props) => {
  const router = useIonRouter();
  const params = useParams();
  const drinks = DrinkStore.useState(getDrinks);
  const cart = CartStore.useState(getCartDrinks);
  const [results, setResults] = useState(drinks);

  const cartRef = useRef();
  const searchRef = useRef();

  useIonViewDidEnter(() => {
    if (params.from_search) {
      setTimeout(() => {
        searchRef.current.setFocus();
      }, 500);
    }
  });

  const search = (e) => {
    const searchTerm = e.currentTarget.value;

    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();

      const newResults = drinks.filter((e) =>
        e.name.toLowerCase().includes(searchTermLower)
      );
      setResults(newResults);
    } else {
      setResults(drinks);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="button-container" onClick={() => router.goBack()}>
            <IonIcon size="large" className="gray-icon" icon={caretBackCircle} />
            </div>
          </IonButtons>

          <IonTitle>Full Menu</IonTitle>

          <IonButtons slot="end">
            <div
              ref={cartRef}
              className="button-container animate__animated"
              onClick={() => router.push("/tabs/cart")}
            >
            <IonIcon size="large" className={
                  cart && cart.length > 0 ? "yellow-icon" : "gray-icon"
                } icon={bag} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader
          collapse="condense"
          className="custom-margin-left animate__animated animate__fadeIn"
        >
          <IonToolbar className="inner-toolbar">
            <IonRow className="ion-no-padding ion-no-margin">
              <IonCol size="9" className="ion-no-padding ion-no-margin">
                <h1 className="main-heading">View Full Range</h1>
                <IonCardSubtitle>Our range of succulent drink</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow className="search-container animate__animated animate__fadeIn">
            <IonCol size="12">
              <IonSearchbar
                onKeyDown={(e) => search(e)}
                id="searchbar"
                ref={searchRef}
                searchIcon={searchSharp}
                placeholder="Try 'Cappuccino'"
              />
            </IonCol>
          </IonRow>

          {results.map((drink) => {
            return (
              <ViewDrinkCard
                key={drink.id}
                drink={drink}
                cartRef={cartRef}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewMenu;
