import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import JobList from "@/components/organism/jobList";

const Favorite = () => {
  const favouriteJobs = useSelector(
    (state: RootState) => state.favourite.value,
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {favouriteJobs.length === 0 ? (
          <Text>Vous n&apos;avez pas de favoris</Text>
        ) : (
          <JobList jobs={favouriteJobs} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
});

export default Favorite;
