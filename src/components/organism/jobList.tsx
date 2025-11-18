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
          style={styles.item}
          onPress={() =>
            navigation.navigate("Details", {
              job,
            })
          }
        >
          <Text style={styles.title}>{job.poste}</Text>
          <Text style={styles.text}>
            Entreprise : {job.entreprise} - {job.email}
          </Text>
          <Text style={styles.text}>
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
  item: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    marginTop: 6,
  },
});

export default JobList;
