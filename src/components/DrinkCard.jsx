import { IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, useIonModal } from "@ionic/react";
// import { ArrowRightSquare } from "react-iconly";
import { caretForwardCircle } from "ionicons/icons";
import ViewDrink from "../pages/ViewDrink"

import styles from "./DrinkCard.module.scss";

const DrinkCard = (props) => {
  const { drink } = props;
  const [present, dismiss] = useIonModal(ViewDrink, {
    close: () => dismiss(),
    drinkID: drink.id,
  });
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [ 1],
    initialBreakpoint: 1,
    backdropBreakpoint: 1,
  };

  return (
    <IonCol size="6" className="animate__animated animate__fadeIn">
      {/* <IonCard className={styles.drinkCard} routerLink={`/drink/${drink.id}`}> */}
      <IonCard className={styles.drinkCard} onClick={() => present(modalOptions)}>
        <img src={drink.image} alt="drink" />
        <IonCardTitle>{drink.name}</IonCardTitle>
        <IonCardSubtitle>{drink.summary}</IonCardSubtitle>
        <div className={styles.drinkPrice}>
          <h4>${drink.price}</h4>
          <IonIcon size="large" icon={caretForwardCircle} />
        </div>
      </IonCard>
    </IonCol>
  );
};
export default DrinkCard;
