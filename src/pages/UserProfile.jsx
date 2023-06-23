import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import styles from "./UserProfile.module.scss";
import { useParams } from "react-router";

import {
  arrowBackOutline,
  ellipsisHorizontal,
  happyOutline,
  imageOutline,
  wineOutline,
} from "ionicons/icons";
import avatar from "../logo/avatar.jpg";
// import { UserStore } from "../store";
import { getUser } from "../store/Selectors";

const UserProfile = (props) => {
  const router = useIonRouter();
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(params.id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [params.id]);

  if (!user) {
    return <div>Loading user...</div>; // Show a loading state while fetching user data
  }


  return (
    <IonPage className={styles.profile}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light" onClick={() => router.goBack()}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="light">
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className={styles.profileHeader}>
                <IonCardContent>
                  <IonRow>
                    <IonCol size="4">
                      <IonAvatar className={styles.avatar}>
                        <img src={avatar} alt="avatar" />
                      </IonAvatar>
                    </IonCol>

                    <IonCol size="7" className={styles.profileInfoContainer}>
                      <IonRow className={styles.profileInfo}>
                        <IonCol size="9">
                          <IonText className={styles.profileName}>
                            <p>{user.name}</p>
                          </IonText>
                          <IonText color="medium">
                            <p>Mobile Team Lead</p>
                          </IonText>
                        </IonCol>
                        <IonCol size="3" className={styles.profileStats}>
                          <IonCol className={styles.profileStat}>
                            <IonCardTitle>109</IonCardTitle>
                            <IonCardSubtitle>Points</IonCardSubtitle>
                          </IonCol>
                        </IonCol>
                      </IonRow>

                      {/* <IonCol className={styles.profileStat}>
                          <IonCardTitle>1.2k</IonCardTitle>
                          <IonCardSubtitle>Followers</IonCardSubtitle>
                        </IonCol> */}
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="10">
                      <IonButton color="main" fill="outline" expand="block">
                        Send Drink
                      </IonButton>
                    </IonCol>

                    <IonCol size="2">
                      <IonButton color="main" expand="block">
                        <IonIcon icon={happyOutline} size="large" />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className={styles.profileStatusContainer}>
            <IonCol size="12">
              <IonCard className={styles.profileCard}>
                <IonCardHeader>
                  <IonRow className={styles.profileStatus}>
                    <IonIcon color="main" icon={imageOutline} />
                    <IonCardSubtitle>Photos</IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>No Photos for this venue</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className={styles.profileStatusContainer}>
            <IonCol size="12">
              <IonCard className={styles.profileCard}>
                <IonCardHeader>
                  <IonRow className={styles.profileStatus}>
                    <IonIcon color="main" icon={wineOutline} />
                    <IonCardSubtitle>Favorite Drinks</IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>No Favorite Drinks</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* 
          <IonRow>
            <IonCol size="6">
              <IonCard className={styles.profileCard}>
                <IonCardContent>
                  <IonIcon icon={imageOutline} />
                  <IonCardTitle>147</IonCardTitle>
                  <IonCardSubtitle>Photos</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className={styles.profileCard}>
                <IonCardContent>
                  <IonIcon icon={bookmarkOutline} />
                  <IonCardTitle>63</IonCardTitle>
                  <IonCardSubtitle>Bookmarks</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className={styles.profileActionContainer}>
            <IonCol size="12">
              <IonCard className={styles.profileActionCard}>
                <IonCardContent>
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>View latest project</IonCardSubtitle>
                    <IonIcon icon={arrowForward} />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
