import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import type { Job } from "@/models/job";
import type { RootStackParamList } from "@/App";
import { formatDate } from "@/helpers/date.helpers";

type JobWithOptionalMeta = Job & { formattedDate?: string };

type JobListProps = {
  jobs: Array<JobWithOptionalMeta>;
};

const JobList = ({ jobs }: JobListProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();

  return (
    <View style={styles.container}>
      {jobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate("Details", {
              job,
            })
          }
        >
          <Text style={styles.title}>{job.poste}</Text>
          <Text style={styles.meta}>
            {job.entreprise} • {job.email}
          </Text>
          <Text style={styles.meta}>
            Date de l&apos;annonce : {job.formattedDate ?? formatDate(job.date)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#111111",
  },
  meta: {
    fontSize: 13,
    marginTop: 2,
    color: "#555555",
  },
});

export default JobList;
