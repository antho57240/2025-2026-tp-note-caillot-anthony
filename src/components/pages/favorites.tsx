import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";
import SortBar from "@/components/molecule/sortBar";
import type { Job } from "@/models/job";
import type { SortKey, SortOrder } from "@/helpers/sort.helpers";

type JobWithOptionalMeta = Job & { timestamp?: number };

const Favorite = () => {
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {!hasFavourites && <Text>Vous n&apos;avez pas de favoris</Text>}

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
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 16,
  },
});

export default Favorite;
