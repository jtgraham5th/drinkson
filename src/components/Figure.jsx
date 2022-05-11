import { IonCol, useIonRouter } from "@ionic/react";
import styles from "./Figure.module.css";

export const Figure = (props) => {
  return (
    <IonCol
      size="4"
      className={styles.figure}
      onClick={props.clickAction}
    >
      <h6>{props.count}</h6>
      <p>{props.title}</p>
    </IonCol>
  );
};
