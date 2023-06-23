import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonIcon, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { caretBack } from 'ionicons/icons';
import './Home.module.scss';

const BarSearch: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="button-container" onClick={() => router.goBack()}>
              <IonIcon icon={caretBack} className="gray-icon" size="large" />
            </div>
          </IonButtons>
          <IonTitle style={{ textAlign: 'center' }}>Search For A Bar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bar Search</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default BarSearch;
