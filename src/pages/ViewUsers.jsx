import {
  IonButtons,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonIcon,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { searchSharp, caretBack, personCircle } from "ionicons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { UserStore } from "../store";
import { getUsers } from "../store/Selectors";
import "./Home.module.scss";
import ViewUserCard from "../components/ViewUserCard";

const ViewUsers = (props) => {
  const router = useIonRouter();
  const params = useParams();
  const users = UserStore.useState(getUsers);
  const [results, setResults] = useState(users);

  const cartRef = useRef();
  const searchRef = useRef();

  useIonViewDidEnter(() => {
    if (params.from_search) {
      setTimeout(() => {
        searchRef.current.setFocus();
      }, 500);
    }
  });

  const search = (e) => {
    const searchTerm = e.currentTarget.value;

    if (searchTerm !== "") {
      const searchTermLower = searchTerm.toLowerCase();

      const newResults = users.filter((e) =>
        e.name.toLowerCase().includes(searchTermLower)
      );
      setResults(newResults);
    } else {
      setResults(users);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="button-container" onClick={() => router.goBack()}>
              <IonIcon
                size="large"
                className="gray-icon"
                icon={caretBack}
              />
            </div>
          </IonButtons>

          <IonTitle>Current Users</IonTitle>

          <IonButtons slot="end">
            <div
              ref={cartRef}
              className="button-container animate__animated"
              onClick={() => router.push("/userprofile")}
            >
              <IonIcon
                size="large"
                className="yellow-icon"
                icon={personCircle}
              />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader
          collapse="condense"
          className="custom-margin-left animate__animated animate__fadeIn"
        >
          <IonToolbar className="inner-toolbar">
            <IonRow className="ion-no-padding ion-no-margin">
              <IonCol size="9" className="ion-no-padding ion-no-margin">
                <h1 className="main-heading">View All Users</h1>
                <IonCardSubtitle>Meet our Patrons</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow className="search-container animate__animated animate__fadeIn">
            <IonCol size="12">
              <IonSearchbar
                onKeyDown={(e) => search(e)}
                id="searchbar"
                ref={searchRef}
                searchIcon={searchSharp}
                placeholder="Type a name"
              />
            </IonCol>
          </IonRow>

          {results.map((user) => {
            return (
              <ViewUserCard
                key={user.id}
                user={user}
                clickAction={() => router.push(`/user/${user.id}`)}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewUsers;
