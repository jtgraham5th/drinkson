import { IonCard, IonCardTitle, IonCol } from "@ionic/react";

import styles from "./SelectDrinkCard.module.scss";

const SelectDrinkCard = (props) => {
  const { category } = props;

  return (
    <IonCol size="6" className="animate__animated animate__fadeIn">
      <IonCard className={styles.selectDrinkCard} onClick={props.select}>
        <IonCardTitle>{category}</IonCardTitle>
      </IonCard>
    </IonCol>
  );
};
export default SelectDrinkCard;
