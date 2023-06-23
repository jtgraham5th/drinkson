import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonButton,
} from "@ionic/react";
import { searchSharp } from "ionicons/icons";
import DrinkCard from "../components/DrinkCard";
import OfferCard from "../components/OfferCard";
import DrinkStore from "../store/DrinkStore";
import OfferStore from "../store/OfferStore";
import BarHeader from "../components/BarHeader";
import { getDrinks, getOffers } from "../store/Selectors";
import "./Home.module.scss";

const Home = () => {
  const router = useIonRouter();
  const drinks = DrinkStore.useState(getDrinks);
  const offers = OfferStore.useState(getOffers);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>Drinkson</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BarHeader />{" "}
        <IonGrid>
          <IonRow className="search-container">
            <IonCol size="12">
              <IonSearchbar
                onClick={() => router.push("/menu")}
                searchIcon={searchSharp}
                placeholder="Search Bar Menu"
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonButton
                color="light"
                fill="solid"
                expand="block"
                onClick={() => router.push("/create")}
              >
                Make Your Own Drink
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
            <h3
              style={{ textAlign: "center" }}
              className="heading"
            >
              Popular
            </h3>

            <div className="filter-icon">
              <IonRouterLink color="main" routerLink="/coffees">
                Filter Icon
              </IonRouterLink>
            </div>
          </IonRow>

          <IonRow>
            {drinks.map((drink) => {
              if (drink.id <= 4) {
                return <DrinkCard key={drink.id} drink={drink} />;
              } else return null;
            })}
          </IonRow>

          <IonRow className="action-row">
            <IonCol size="12">
              <h3 style={{ textAlign: "center" }} className="heading">
                Special Offers
              </h3>
            </IonCol>
          </IonRow>

          {offers.map((offer) => {
            if (offer.id <= 1) {
              return <OfferCard key={offer.id} offer={offer} />;
            } else return null;
          })}
        </IonGrid>{" "}
      </IonContent>
    </IonPage>
  );
};

export default Home;
