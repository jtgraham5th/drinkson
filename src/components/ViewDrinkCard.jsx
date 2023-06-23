import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCol,
  IonRow,
  useIonModal,
} from "@ionic/react";
import { useRef } from "react";
import { bag } from "ionicons/icons";
import { addToCart } from "../store/CartStore";
import "../pages/Home.module.scss";
import ViewDrink from "../pages/ViewDrink";
import styles from "./DrinkCard.module.scss";

const ViewDrinkCard = (props) => {
  const { drink, cartRef } = props;
  const drinkCartRef = useRef(null);
  const [present, dismiss] = useIonModal(ViewDrink, {
    close: () => dismiss(),
    drinkID: drink.id,
  });
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  const addDrinkToCart = (e, drinkID) => {
    e.preventDefault();
    e.stopPropagation();

    if (drinkCartRef.current) {
      drinkCartRef.current.style.display = "";
      drinkCartRef.current.classList.add("animate__fadeOutUp");
      const newDrink = { drinkID: drinkID, drinkSizeID: 2 };
      setTimeout(() => {
        if (cartRef.current) {
          cartRef.current.classList.add("animate__tada");
          addToCart(newDrink);
          setTimeout(() => {
            if (cartRef.current) {
              cartRef.current.classList.remove("animate__tada");
            }
            if (drinkCartRef.current) {
              drinkCartRef.current.style.display = "none";
            }
          }, 500);
        }
      }, 500);
    }
  };

  return (
    <IonRow
      key={drink.id}
      className={`animate__animated animate__fadeIn ${styles.background}`}
    >
      <IonCol size="6">
        <IonCard className={styles.drinkCard}>
          <img src={drink.image} alt="drink type" />
          <IonCardTitle className="custom-margin-left">
            {drink.name}
          </IonCardTitle>
          <IonCardSubtitle className="custom-margin-left">
            {drink.summary || drink.category}
          </IonCardSubtitle>
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
            {drink.ingredients.map((ingredient, i) => (
              <h6 key={i}>{ingredient}</h6>
            ))}
          </>
        )}

        <IonRow className="ion-justify-content-between">
          <IonCol size="8">
            <IonButton
              onClick={() => present(modalOptions)}
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
      </IonCol>
    </IonRow>
  );
};

export default ViewDrinkCard;
