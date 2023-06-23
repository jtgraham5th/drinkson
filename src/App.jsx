import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonLabel,
} from "@ionic/react";
import {
  bag,
  bagOutline,
  heart,
  heartOutline,
  home,
  homeOutline,
  search,
  searchOutline,
  person,
  personOutline,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home.jsx";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import BarSearch from "./pages/BarSearch";
import ViewMenu from "./pages/ViewMenu";
import UserProfile from "./pages/UserProfile";
import ViewDrink from "./pages/ViewDrink";
import Cart from "./pages/Cart.jsx";
import ViewUsers from "./pages/ViewUsers.jsx";
import CreateDrink from "./pages/CreateDrink.jsx";
import ViewDrinkSearch from "./pages/ViewDrinkSearch";
import Favorites from "./pages/Favorites.jsx";
import SpecialOffers from "./pages/SpecialOffers.jsx";

setupIonicReact();
const tabs = [
  {
    name: "Home",
    url: "/home",
    activeIcon: home,
    icon: homeOutline,
    component: Home,
  },
  {
    name: "Search",
    url: "/search",
    activeIcon: search,
    icon: searchOutline,
    component: BarSearch,
  },
  {
    name: "Favorites",
    url: "/favorites",
    activeIcon: heart,
    icon: heartOutline,
    component: Favorites,
  },
  {
    name: "Cart",
    url: "/cart",
    activeIcon: bag,
    icon: bagOutline,
    component: UserProfile,
  },
  {
    name: "User",
    url: "/users",
    activeIcon: person,
    icon: personOutline,
    component: UserProfile,
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs onIonTabsDidChange={(e) => setActiveTab(e.detail.tab)}>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={() => <Redirect to="/home" />} />
            <Route
              exact={false}
              path="/drink/:id"
              render={(props) => <ViewDrink {...props} />}
            />

            <Route
              exact={false}
              path="/menu"
              render={(props) => <ViewMenu {...props} />}
            />
            <Route
              exact={false}
              path="/search/drinks/:query"
              render={(props) => <ViewDrinkSearch {...props} />}
            />
            <Route
              exact
              path="/users"
              render={(props) => <ViewUsers {...props} />}
            />
            <Route exact path="/cart" render={(props) => <Cart {...props} />} />
            <Route
              exact
              path="/favorites"
              render={(props) => <Favorites {...props} />}
            />
            <Route exact path="/search" component={BarSearch} />
            <Route exact path="/create" component={CreateDrink} />
            <Route exact path="/userprofile" component={UserProfile} />
            <Route exact path="/viewdrinksearch" component={ViewDrinkSearch} />
            <Route exact path="/specialoffers" component={SpecialOffers} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {tabs.map((tab, barIndex) => {
              const active = tab.name === activeTab;

              return (
                <IonTabButton
                  key={`tab_${barIndex}`}
                  tab={tab.name}
                  href={tab.url}
                >
                  <IonIcon icon={active ? tab.activeIcon : tab.icon} />
                  <IonLabel>{tab.name}</IonLabel>
                </IonTabButton>
              );
            })}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
