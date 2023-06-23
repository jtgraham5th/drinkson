import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import { useStoreState } from 'pullstate';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { caretBack } from "ionicons/icons";
import styles from "./SpecialOffers.module.scss";
import OfferStore from "../store/OfferStore";

const SpecialOffers = () => {
  const offers = useStoreState(OfferStore, (s) => s.offers);
  const history = useHistory(); // Initialize useHistory

  const close = () => {
    history.push('/home'); // Navigate to '/home' route
  };

  return (
    <IonPage id="special-offers-page">
      <IonHeader>
        <IonToolbar className={styles.toolbar}>
          <IonButtons slot="start">
            <div className={styles.buttonContainer} onClick={close}>
              <IonIcon icon={caretBack} className={styles.grayIcon} size="large" />
            </div>
          </IonButtons>
          <IonTitle style={{ textAlign: 'center' }}>Special Offers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={styles.offersContainer}>
          {offers.map((offer) => (
            <div key={offer.id} className={styles.offerItem}>
              <img src={offer.image} alt="Offer" className={styles.offerImage} />
              <div className={styles.offerDetails}>
                <h2 className={styles.offerTitle}>{offer.title}</h2>
                <p className={styles.offerDescription}>{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SpecialOffers;
