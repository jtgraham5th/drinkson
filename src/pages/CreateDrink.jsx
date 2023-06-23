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

  const handleSearchChange = (event) => {
    const searchTerm = event.currentTarget.value;

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

  const handleSearchCategories = async (e) => {
    const selected = e.target.innerText;
  
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selected}`
      )
      .then((res) => {
        const routerOptions = res.data;
        router.push({
          pathname: `/search/drinks/${selected}`,
          routerOptions,
        });
      });
  };
  
  const handleSearchIngredient = async (e) => {
    const selected = e.target.innerText;
  
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selected}`
      )
      .then((res) => {
        const routerOptions = res.data;
        router.push({
          pathname: `/search/drinks/${selected}`,
          routerOptions,
        });
      });
  };
  
  const handleSearchDrink = async (e) => {
    e.preventDefault();
    const selected = e.target[0].value;
    await axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selected}`
      )
      .then((res) => {
        const routerOptions = res.data;
  
        if (!routerOptions.drinks) {
          setNoResults(true);
        } else {
          router.push({
            pathname: `/search/drinks/${selected}`,
            routerOptions,
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
          <IonTitle style={{ textAlign: 'center' }}>Create Your Drink</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} fullscreen>
        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
          <h3 className="heading" >Browse Drink Categories</h3>
        </IonRow>

        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center" style={{ marginTop: '.5rem' }}>
          <IonCol size="15">
            <Swiper slidesPerView={4} spaceBetween={5} modules={FreeMode}>
              {categories.map((category, i) => (
                <SwiperSlide key={i}>
                  <SelectDrinkCard
                    category={category}
                    select={(e) => handleSearchCategories(e)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </IonCol>
        </IonRow>

        <IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
          <h3 className="heading">Search by Ingredient or Drink Name</h3>
        </IonRow>

        <IonRow className="search-container" style={{ marginTop: '1rem' }}>
          <IonCol size="12">
            <form onSubmit={(e) => handleSearchDrink(e)}>
              <IonSearchbar
                onKeyDown={(e) => handleSearchChange(e)}
                onIonClear={() => setResults(ingredients)}
                id="searchbar"
                ref={searchRef}
                searchIcon={searchSharp}
                placeholder="Try 'Manhattan'"
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
                <IonItem button onClick={(e) => handleSearchIngredient(e)} detail>
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
