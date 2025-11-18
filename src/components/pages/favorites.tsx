import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";
import SortBar from "@/components/molecule/sortBar";
import type { Job } from "@/models/job";
import type { SortKey, SortOrder } from "@/helpers/sort.helpers";
import type { RootStackParamList } from "@/App";

type JobWithOptionalMeta = Job & { timestamp?: number };

const Favorite = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Favorites">>();

  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value as JobWithOptionalMeta[],
  );

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedJobs = useMemo(() => {
    const sorted = [...favouriteJobs];
    const directionFactor = sortOrder === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      if (sortKey === "date") {
        const aTimestamp =
          typeof a.timestamp === "number"
            ? a.timestamp
            : new Date(a.date).getTime();
        const bTimestamp =
          typeof b.timestamp === "number"
            ? b.timestamp
            : new Date(b.date).getTime();

        return directionFactor * (aTimestamp - bTimestamp);
      }

      return directionFactor * (a.salaireAnnuel - b.salaireAnnuel);
    });

    return sorted;
  }, [favouriteJobs, sortKey, sortOrder]);

  const hasFavourites = favouriteJobs.length > 0;

  useEffect(() => {
    const state = navigation.getState();
    const routes = state.routes;
    const index = state.index;
    const previousRoute = index > 0 ? routes[index - 1] : undefined;

    const backTitle = previousRoute?.name === "Details" ? "Annonce" : "Retour";

    navigation.setOptions({ headerBackTitle: backTitle });
  }, [navigation]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        {!hasFavourites && (
          <Text style={styles.emptyText}>Vous n&apos;avez pas de favoris</Text>
        )}

        {hasFavourites && (
          <>
            <SortBar
              sortKey={sortKey}
              sortOrder={sortOrder}
              onChangeKey={setSortKey}
              onToggleOrder={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            />
            <JobList jobs={sortedJobs} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#555555",
  },
});

export default Favorite;
