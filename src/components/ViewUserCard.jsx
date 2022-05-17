import {
  IonPage,
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCol,
  IonRow,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import styles from "./ViewUserCard.module.scss";
import { useRef } from "react";
import { bag } from "ionicons/icons";
import { addToCart } from "../store/CartStore";
import "../pages/Home.module.scss";

const ViewUserCard = (props) => {
  const { user, clickAction } = props;
  const router = useIonRouter();
  // const drinkCartRef = useRef();

  // const addDrinkToCart = (e, drinkID) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   drinkCartRef.current.style.display = "";
  //   drinkCartRef.current.classList.add("animate__fadeOutUp");
  //   const newDrink = {drinkID: drinkID, drinkSizeID: 2}
  //   setTimeout(() => {
  //     cartRef.current.classList.add("animate__tada");
  //     addToCart(newDrink);
  //     setTimeout(() => {
  //       cartRef.current.classList.remove("animate__tada");
  //       drinkCartRef.current.style.display = "none";
  //     }, 500);
  //   }, 500);
  // };

  return (
    <IonRow key={user.id} className="animate__animated animate__fadeIn">
      <IonCol size="12" onClick={clickAction}>
        <IonCard className={styles.userCard}>
          <IonCol size="4">
            <img src={user.image} alt="drink type" />
          </IonCol>
          <IonCol size="8" className={styles.userCardInfo}>
            <IonRow>
              <IonCol size="9" className={styles.profileInfo}>
                <IonCardTitle>{user.name}</IonCardTitle>
                <IonCardSubtitle>{user.favoriteDrink}</IonCardSubtitle>
              </IonCol>
              <IonCol size="3" className={styles.profileStats}>
                <IonCol className={styles.profileStat}>
                  <IonCardTitle>{user.drinkScore}</IonCardTitle>
                  <IonCardSubtitle>Points</IonCardSubtitle>
                </IonCol>
              </IonCol>
            </IonRow>
            <IonButton color="main" fill="outline" expand="block">
              Send Drink
            </IonButton>
          </IonCol>
        </IonCard>
      </IonCol>

      {/*<IonCol
        size="6"
        className="ion-margin-top ion-padding-top ion-padding-end"
      >
        <IonCardSubtitle>Description</IonCardSubtitle>
        <p>{drink.description}</p>

        <IonRow className="ion-justify-content-between">
          <IonCol size="8">
            <IonButton
              routerLink={`/drink/${drink.id}`}
              color="main"
              expand="block"
            >
              View &rarr;
            </IonButton>
          </IonCol>

           <IonCol size="4">
            <IonButton
              color="main"
              expand="block"
              onClick={(e) => addDrinkToCart(e, drink.id)}
            >
               <Bag set="bold" />
              <IonIcon size="large" icon={bag} />
            </IonButton>

            <div
              ref={drinkCartRef}
              style={{
                position: "absolute",
                display: "none",
                fontSize: "3rem",
              }}
              className="animate__animated"
            >
              <IonIcon size="large" icon={bag} />
            </div>
          </IonCol> 
        </IonRow>
      </IonCol>*/}
    </IonRow>
  );
};

export default ViewUserCard;
