import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { API_BASE } from "../constants";
import { getFlashcard } from "../utils/api";

export default function FlashcardScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    getFlashcard()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      </ThemedView>
    );
  if (error || !data)
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load Flashcard</ThemedText>
      </ThemedView>
    );

  return (
    <View style={styles.fullScreenWeb}> {/* Use a plain View for web root */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <ThemedText style={styles.headerTitle}>UNLEARN OLD PATTERNS</ThemedText>
          <ThemedText style={styles.headerSubtitle}>No Distractions 101</ThemedText>
        </View>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.image_url && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: data.image_url.startsWith("http")
                  ? data.image_url
                  : `${API_BASE}${data.image_url}`,
              }}
              style={styles.mainImage}
              contentFit="cover"
            />
            <View style={styles.numberCircle}>
              <ThemedText style={styles.numberText}>1</ThemedText>
            </View>
          </View>
        )}

        <View style={styles.cardSection}>
          <View style={styles.cardContentWrapper}>
            <ThemedText type="title" style={styles.cardTitle}>
              {data.title || "What Qualifies as Distractions?"}
            </ThemedText>
            <ThemedText style={styles.cardContent}>
              {data.content ||
                "Toys and screens? Obvious distractions. But so are:\n- \"Open your mouth! Here comes an aeroplane woooooo!!\"\n- \"Look there's a bird!\", as the bite goes in <child name>'s mouth.\n- \"I'm closing my eyes. Let me see who comes to take a bite: you or the cat!\""}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenWeb: {
    flex: 1,
    backgroundColor: "#fff",
    maxWidth: Platform.OS === 'web' ? 500 : '100%',
    alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A2E44",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 50 : 12, // Apply padding top for iOS safe area only
    height: Platform.OS === 'web' ? 70 : 'auto',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#A0AEC0",
    fontSize: 12,
  },
  placeholderIcon: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
    marginBottom: -80,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  numberCircle: {
    position: "absolute",
    bottom: -30,
    left: "10%",
    backgroundColor: "#2C3E50",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  numberText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  cardSection: {
    backgroundColor: "#E0F7FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingTop: 80,
  },
  cardContentWrapper: {
    backgroundColor: "#B2EBF2",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 10,
    textAlign: "left",
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#424242",
    textAlign: "left",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activityIndicator: {
    marginTop: -80,
  },
});