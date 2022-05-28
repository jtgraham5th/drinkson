import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/react";

import styles from "./DrinkCard.module.scss";

const OfferCard = (props) => {
  const { offer } = props;

  return (
    <IonRow>
      <IonCol size="12" className="animate__animated animate__fadeIn">
        <IonCard className={`${styles.drinkCard} ${styles.drinkCardLong}`}>
          <IonRow>
            <IonCol size="4">
              <img src={offer.image} alt="drink" />
            </IonCol>

            <IonCol size="8">
              <div className={styles.drinkCardLongDetails}>
                <IonCardTitle>{offer.title}</IonCardTitle>
                <p>{offer.description}</p>
              </div>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default OfferCard;
