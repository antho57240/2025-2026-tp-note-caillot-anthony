import { Image, Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { JobDetailsProps } from "@/components/molecule/jobDetailsOnList";
import type { Job } from "@/models/job";
import type { RootStackParamList } from "@/App";
import { RootState } from "@/stores/store";
import { push, remove } from "@/stores/favouriteSlice";
import { formatDate } from "@/helpers/date.helpers";

export const JobDetails = ({ route }: JobDetailsProps) => {
  const job: Job = route.params.job;

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Details">>();
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isInFavourite = useSelector((state: RootState) =>
    state.favourite.value.some((fav) => fav.id === job.id),
  );

  const handleOpenPhone = () => {
    if (!job.telephone) {
      return;
    }

    Linking.openURL(`tel:${job.telephone}`);
  };

  const handleOpenEmail = () => {
    if (!job.email) {
      return;
    }

    Linking.openURL(`mailto:${job.email}`);
  };

  const handleFavouritePress = () => {
    if (isInFavourite) {
      dispatch(remove(job.id));
      setSnackbarMessage("Annonce supprimée des favoris.");
      setSnackbarVisible(true);
    } else {
      dispatch(push(job));
      navigation.navigate("Favorites");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {job.poste}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information :</Text>
        <Text>Salaire annuel : {job.salaireAnnuel} EUR</Text>
        <Text>
          Adresse email RH :{" "}
          <Text style={styles.link} onPress={handleOpenEmail}>
            {job.email}
          </Text>
        </Text>
        <Text>
          Numero RH :{" "}
          <Text style={styles.link} onPress={handleOpenPhone}>
            {job.telephone}
          </Text>
        </Text>
        <Text>Date de l&apos;annonce : {formatDate(job.date)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entreprise :</Text>
        <View style={styles.companyRow}>
          <Image
            source={{ uri: job.entreprisePhoto }}
            style={styles.companyLogo}
          />
          <View style={styles.companyTextContainer}>
            <Text>{job.entreprise}</Text>
            <Text>Ville : {job.ville}</Text>
            <Text>
              Adresse : {job.numeroRue} {job.rue}
              {job.codePostal ? ` - ${job.codePostal}` : ""}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description :</Text>
        <Text>{job.description}</Text>
      </View>

      <Button
        mode="contained"
        buttonColor="#2ecc71"
        style={styles.favouriteButton}
        onPress={handleFavouritePress}
      >
        {isInFavourite ? "Supprimer des favoris" : "Ajouter au favoris"}
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  companyTextContainer: {
    flex: 1,
  },
  favouriteButton: {
    alignSelf: "center",
    marginTop: 8,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
