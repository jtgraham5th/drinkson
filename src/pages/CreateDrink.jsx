import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonSearchbar,
  IonRow,
  useIonRouter,
  useIonViewDidEnter,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { useParams } from "react-router";
import { useState, useRef } from "react";
import axios from "axios";
import { caretBack, searchSharp } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { Virtuoso } from "react-virtuoso";
import DrinkQueryStore from "../store/DrinkQueryStore";
import "./Home.module.scss";
import SelectDrinkCard from "../components/SelectDrinkCard";
import { getDrinkCategories, getDrinkIngredients } from "../store/Selectors";

const CreateDrink = () => {
  const router = useIonRouter();
  const params = useParams();
  const categories = DrinkQueryStore.useState(getDrinkCategories);
  const ingredients = DrinkQueryStore.useState(getDrinkIngredients);
  const searchRef = useRef();
  const [results, setResults] = useState(ingredients);
  const [noResults, setNoResults] = useState(false);

  useIonViewDidEnter(() => {
    setResults(ingredients);
    if (params.from_search) {
      setTimeout(() => {
        searchRef.current.setFocus();
      }, 500);
    }
  });

  const search = (e) => {
    const searchTerm = e.currentTarget.value;

    if (searchTerm !== "") {
      setNoResults(false);
      const searchTermLower = searchTerm.toLowerCase();

      const newResults = ingredients.filter((e) =>
        e.toLowerCase().includes(searchTermLower)
      );
      setResults(newResults);
    } else {
      setResults(ingredients);
    }
  };
  const searchCategories = async (e) => {
    const selected = e.target.innerText;

    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selected}`
      )
      .then((res) =>
        router.push({
          pathname: `/search/drinks/${selected}`,
          routerOptions: res.data,
        })
      );
  };

  const searchIngredient = async (e) => {
    const selected = e.target.innerText;

    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selected}`
      )
      .then((res) =>
        router.push({
          pathname: `/search/drinks/${selected}`,
          routerOptions: res.data,
        })
      );
  };
  const searchDrink = async (e) => {
    e.preventDefault();
    const selected = e.target[0].value;
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selected}`
      )
      .then((res) => {
        if (!res.data.drinks) {
          setNoResults(true);
        } else {
          router.push({
            pathname: `/search/drinks/${selected}`,
            routerOptions: res.data,
          });
        }
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="button-container" onClick={() => router.goBack()}>
              <IonIcon icon={caretBack} className="gray-icon" size="large" />
            </div>
          </IonButtons>

          <IonTitle>Create Your Drink</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} fullscreen>
        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
          <h4 className="heading">Browse Drink Categories</h4>
        </IonRow>

        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
          <IonCol size="12">
            <Swiper slidesPerView={3} spaceBetween={5} modules={FreeMode}>
              {categories.map((category, i) => (
                <SwiperSlide key={i}>
                  <SelectDrinkCard
                    category={category}
                    select={(e) => searchCategories(e)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </IonCol>
        </IonRow>

        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
          <h4 className="heading">Search by Ingredient or Drink Name</h4>
        </IonRow>

        <IonRow className="search-container">
          <IonCol size="12">
            <form onSubmit={(e) => searchDrink(e)}>
              <IonSearchbar
                onKeyDown={(e) => search(e)}
                onIonClear={() => setResults(ingredients)}
                id="searchbar"
                ref={searchRef}
                searchIcon={searchSharp}
                placeholder="Try 'Cappuccino'"
              />
            </form>
          </IonCol>
        </IonRow>
        {noResults ? (
          <h2>No results found</h2>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={results.length}
            itemContent={(index) => {
              return (
                <IonItem button onClick={(e) => searchIngredient(e)} detail>
                  <IonLabel>{results[index]}</IonLabel>
                </IonItem>
              );
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default CreateDrink;
