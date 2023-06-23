import { IonCard, IonCardTitle, IonCol, IonRow } from "@ionic/react";
import { useHistory } from "react-router-dom";
import styles from "./DrinkCard.module.scss";

const OfferCard = (props) => {
  const { offer } = props;
  const history = useHistory();

  const handleCardClick = () => {
    history.push("/specialoffers");
  };

  return (
    <IonRow>
      <IonCol size="12" className="animate__animated animate__fadeIn">
        <IonCard className={`${styles.drinkCard} ${styles.drinkCardLong}`} onClick={handleCardClick}>
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
