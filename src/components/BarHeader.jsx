import {
  useIonRouter,
  IonAvatar,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import styles from "./BarHeader.module.scss";
import {
  arrowBackOutline,
  cameraOutline,
  filterOutline,
  menuOutline,
} from "ionicons/icons";
import { Figure } from "../components/Figure";
import logo from "../logo/beverley-logo.jpeg";

const BarHeader = () => {
  const router = useIonRouter();

  return (
    <>
      <IonGrid className={styles.background}>
        <IonCol className={styles.top}>
          <IonRow>
            <IonCol size="12">
              <IonAvatar className={styles.avatar}>
                <img src={logo} />
              </IonAvatar>
              <div className={styles.avatarUpload}>
                <IonIcon icon={cameraOutline} />
              </div>
            </IonCol>
          </IonRow>

          <IonRow className={styles.profileHeader}>
            <IonCol size="12" className="ion-text-center">
              <IonCardTitle className="ion-card-title">
                The Beverley
              </IonCardTitle>
              <IonCardSubtitle className="ion-card-subtitle">
                790 Glenwood Ave SE Ste 260, Atlanta, GA 30316
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonGrid>

      <IonGrid className={`${styles.figures} ion-no-padding ion-no-margin`}>
        <IonRow>
          <Figure count="30" title="Drinkers" clickAction={() => router.push("/users")} />
          <Figure count="849" title="Followers" />
          <Figure count="12:00 am" title="Last Call" />
        </IonRow>
      </IonGrid>
    </>
  );
};

export default BarHeader;
