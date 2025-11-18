import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { Provider as StoreProvider } from "react-redux";
import Movies from "@/components/pages/job";
import { createStackNavigator } from "@react-navigation/stack";
import { JobDetails } from "@/components/template/jobDetails";
import { store } from "@/stores/store";
import Favorite from "@/components/pages/favorites";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2ecc71",
    secondary: "#3498db",
    background: "#f4f5f7",
  },
};

const Stack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#ffffff",
    },
    headerTintColor: "#111111",
    headerBackTitle: "Retour",
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
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
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
}
