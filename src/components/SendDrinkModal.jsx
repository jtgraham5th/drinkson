import {
  IonRow,
  IonButtons,
  IonTitle,
  IonButton,
  IonCol,
  IonSearchbar,
  IonContent,
  IonHeader,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
// import { ArrowRightSquare } from "react-iconly";
import { searchSharp } from "ionicons/icons";
import { Virtuoso } from "react-virtuoso";
import { useRef, useState } from "react";
import { UserStore } from "../store";
import { getUsers } from "../store/Selectors";
import ViewUserCard from "../components/ViewUserCard";

// import styles from "./SendDrinkModal.module.scss";

const SendDrinkModal = ({ dismiss }) => {
  const router = useIonRouter();
  const users = UserStore.useState(getUsers);
  const [results, setResults] = useState(users);
  console.log(results);
  const searchRef = useRef();

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
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Select a User</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={results.length}
          itemContent={(index) => {
            return (
              <ViewUserCard
                key={results[index].id}
                user={results[index]}
                clickAction={() => router.push(`/user/${results[index].id}`)}
              />
            );
          }}
        />
      </IonContent>
    </>
  );
};
export default SendDrinkModal;
