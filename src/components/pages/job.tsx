import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useMemo, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import jobsData from "../../data/jobs.json" with { type: "json" };
import type { Job } from "@/models/job";
import type { RootStackParamList } from "@/App";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";
import SortBar from "@/components/molecule/sortBar";
import type { SortKey, SortOrder } from "@/helpers/sort.helpers";
import { formatDate } from "@/helpers/date.helpers";

type JobWithMeta = Job & {
  timestamp: number;
  formattedDate: string;
};

const allJobs: JobWithMeta[] = (jobsData as Job[]).map((job) => ({
  ...job,
  timestamp: new Date(job.date).getTime(),
  formattedDate: formatDate(job.date),
}));

const JobsPage = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered =
      term.length === 0
        ? allJobs
        : allJobs.filter((job) => {
            const haystacks = [job.poste, job.entreprise, job.ville];
            return haystacks.some((field) =>
              field.toLowerCase().includes(term),
            );
          });

    const sorted = [...filtered];
    const directionFactor = sortOrder === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      if (sortKey === "date") {
        return directionFactor * (a.timestamp - b.timestamp);
      }

      return directionFactor * (a.salaireAnnuel - b.salaireAnnuel);
    });

    return sorted;
  }, [search, sortKey, sortOrder]);

  const jobsCountLabel = (() => {
    if (filteredJobs.length === 0) {
      return "Aucune annonce disponible";
    }
    if (filteredJobs.length === 1) {
      return "1 annonce disponible";
    }
    return `${filteredJobs.length} annonces disponibles`;
  })();

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Button
          mode="contained"
          buttonColor="#537cbaff"
          style={styles.favouriteButton}
          onPressOut={() => navigation.navigate("Favorites")}
        >
          Mes favoris : {favouriteJobs.length}
        </Button>

        <TextInput
          mode="outlined"
          placeholder="Rechercher par poste, entreprise ou ville"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <SortBar
          sortKey={sortKey}
          sortOrder={sortOrder}
          onChangeKey={setSortKey}
          onToggleOrder={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        />

        <Text style={styles.countText}>{jobsCountLabel}</Text>

        <JobList jobs={filteredJobs} />
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
  favouriteButton: {
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 24,
    paddingHorizontal: 8,
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  countText: {
    marginHorizontal: 16,
    marginBottom: 8,
    color: "#555555",
  },
});

export default JobsPage;
