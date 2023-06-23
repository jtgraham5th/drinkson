import React from "react";
import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonIcon,
  IonToolbar,
  useIonRouter,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from "@ionic/react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { caretBackCircle } from "ionicons/icons";
import { useParams } from "react-router";
import ViewDrinkCard from "../components/ViewDrinkCard";
import { addNewDrink } from "../store/DrinkStore";
import "./Home.module.scss";
import styles from "./ViewDrinkSearch.module.scss";

const ViewDrinkSearch = (props) => {
  const router = useIonRouter();
  const params = useParams();
  const [results, setResults] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState({
    id: null,
    name: null,
    image: null,
    category: null,
    ingredients: [],
  });

  const cartRef = useRef();
  useEffect(() => {
    if (props.location.routerOptions) {
      setResults(props.location.routerOptions.drinks);
    }
  }, [props.location.routerOptions]);

  useEffect(() => {
    addNewDrink(selectedDrink);
  }, [selectedDrink]);

  const getDrinkData = async (id) => {
    if (id === selectedDrink.id) {
      setSelectedDrink({
        id: null,
        name: null,
        image: null,
        category: null,
        ingredients: [],
      });
    } else {
      await axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          let ingredients = [];
          for (let i = 1; i < 16; i++) {
            if (res.data.drinks[0][`strIngredient${i}`] == null) {
              break;
            }
            ingredients.push(res.data.drinks[0][`strIngredient${i}`]);
          }
          setSelectedDrink({
            id: id,
            name: res.data.drinks[0].strDrink,
            image: res.data.drinks[0].strDrinkThumb,
            category: res.data.drinks[0].strCategory,
            ingredients: ingredients,
            price: "5.00",
            extras: [],
            prices: [
              {
                size_id: 1,
                price: "5.35",
              },
              {
                size_id: 2,
                price: "10.00",
              },
              {
                size_id: 3,
                price: "15.00",
              },
            ],
          });
        });
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
                icon={caretBackCircle}
              />
            </div>
          </IonButtons>

          <IonTitle>{params.query}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonList>
            {results.map((drink) => (
              <React.Fragment key={drink.idDrink}>
                <IonItem
                  lines="none"
                  detail={true}
                  className={styles.searchItem}
                  onClick={() => getDrinkData(drink.idDrink)}
                >
                  <img alt="cart drink" src={drink.strDrinkThumb} />
                  <IonLabel className="ion-padding-start ion-text-wrap">
                    <h4>{drink.strDrink}</h4>
                  </IonLabel>

                  <div className={styles.searchActions}>
                    <IonBadge color="dark">$5.00</IonBadge>
                  </div>
                </IonItem>
                {selectedDrink.id === drink.idDrink && (
                  <ViewDrinkCard
                    key={selectedDrink.id}
                    drink={selectedDrink}
                    cartRef={cartRef}
                  />
                )}
              </React.Fragment>
            ))}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewDrinkSearch;
