import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";

import { Provider as StoreProvider } from "react-redux";
import Movies from "@/components/pages/job";
import { createStackNavigator } from "@react-navigation/stack";
import { JobDetails } from "@/components/template/jobDetails";
import { store } from "@/stores/store";
import Favorite from "@/components/pages/favorites";

const Stack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: "center",
  },
  screens: {
    Liste: {
      screen: Movies,
      options: {
        title: "Liste des annonces",
      },
    },
    Details: {
      screen: JobDetails,
      options: {
        title: "Annonce",
      },
    },
    Favorites: {
      screen: Favorite,
      options: {
        title: "Mes Favoris",
      },
    },
  },
});
const Navigation = createStaticNavigation(Stack);
export type RootStackParamList = StaticParamList<typeof Stack>;

export default function App() {
  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
}
