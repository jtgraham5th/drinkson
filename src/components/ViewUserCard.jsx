import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/react";
import styles from "./ViewUserCard.module.scss";
import "../pages/Home.module.scss";

const ViewUserCard = (props) => {
  const { user, clickAction } = props;
  console.log(user)

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
    </IonRow>
  );
};

export default ViewUserCard;
