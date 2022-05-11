import {
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
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
  IonIcon,
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drinkson</IonTitle>
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
                placeholder="Try 'Caramel Latte'"
              />
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol size="12">
            <IonButton color="main" fill="outline" expand="block">
              Make Your Own Drink
            </IonButton>
            </IonCol>
          </IonRow>
          
          <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
            <h4 className="heading">Popular</h4>

            <IonRouterLink color="main" routerLink="/coffees">
              <div>Filter Icon</div>
            </IonRouterLink>
          </IonRow>

          <IonRow>
            {drinks.map((drink) => {
              if (drink.id <= 2) {
                return <DrinkCard key={drink.id} drink={drink} />;
              }
            })}
          </IonRow>

          <IonRow className="outer-heading">
            <IonCol size="12">
              <h4 className="heading">Special Offers</h4>
            </IonCol>
          </IonRow>

          {offers.map((offer) => {
            return <OfferCard key={offer.id} offer={offer} />;
          })}
        </IonGrid>{" "}
      </IonContent>
    </IonPage>
  );
};

export default Home;
