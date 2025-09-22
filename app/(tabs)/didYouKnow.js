import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { API_BASE } from "../../constants";
import { getDidYouKnow } from "../../utils/api";

export default function DidYouKnowScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getDidYouKnow()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !data) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load Did You Know</ThemedText>
      </ThemedView>
    );
  }

  // Use a fallback child name if needed
  const childName = data.child_name || "<child name>";

  const mainContent =
    data.content ||
    `Toys and screens? Obvious distractions. But so are:
- "Open your mouth! Here comes an aeroplane woooooo!!"
- "Look there's a bird!", as the bite goes in ${childName}'s mouth.
- "I'm closing my eyes. Let me see who comes to take a bite: you or the cat!"`;

  return (
    <View style={styles.fullScreenWeb}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <ThemedText style={styles.headerTitle}>UNLEARN OLD PATTERNS</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Distractions=No No!</ThemedText>
        </View>
        <View style={styles.placeholderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Section */}
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
            <View style={styles.didYouKnowBubble}>
              <View style={styles.lightbulbIcon}>
                <Ionicons name="bulb-outline" size={30} color="#FFD700" />
              </View>
              <ThemedText style={styles.didYouKnowText}>DID YOU KNOW?</ThemedText>
            </View>
          </View>
        )}

        {/* Card Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardContentWrapper}>
            {/* Cause & Effect */}
            {data.cause_and_effect && (
              <View style={styles.causeEffectRow}>
                <View style={styles.causeEffectBox}>
                  <ThemedText style={styles.causeEffectLabel}>
                    {data.cause_and_effect.cause_label || "Eating with distractions"}
                  </ThemedText>
                </View>
                <View style={styles.circleDivider}>
                  <ThemedText style={styles.circleDividerText}>→</ThemedText>
                </View>
                <View style={styles.causeEffectBox}>
                  <ThemedText style={styles.causeEffectLabel}>
                    {data.cause_and_effect.effect_label ||
                      "Higher rates of healthy food refusal"}
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Main Content */}
            <View style={styles.mainContentWrapper}>
              {mainContent.split("\n").map((line, idx) => (
                <ThemedText key={idx} style={styles.mainContentText}>
                  {line}
                </ThemedText>
              ))}
            </View>

            {/* Citation */}
            {data.citation?.url && (
              <ThemedText
                style={styles.citationText}
                onPress={() => Linking.openURL(data.citation.url)}
              >
                {data.citation.label ||
                  "Journal of Applied Developmental Development Psychology"}
              </ThemedText>
            )}
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
    maxWidth: Platform.OS === "web" ? 500 : "100%",
    alignSelf: Platform.OS === "web" ? "center" : "auto",
    height: Platform.OS === "web" ? "100vh" : "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A2E44",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 50 : 12,
    height: Platform.OS === "web" ? 70 : "auto",
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
  didYouKnowBubble: {
    position: "absolute",
    bottom: -30,
    left: "10%",
    right: "10%",
    backgroundColor: "#FFEBEE",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  lightbulbIcon: {
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  didYouKnowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E53935",
  },
  cardSection: {
    backgroundColor: "#FFEBEE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingTop: 80,
  },
  cardContentWrapper: {
    backgroundColor: "#FCE4EC",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  causeEffectRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  causeEffectBox: {
    backgroundColor: "#F48FB1",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  causeEffectLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  circleDivider: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EC407A",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  circleDividerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    transform: [{ rotateY: "180deg" }],
  },
  mainContentWrapper: {
    marginBottom: 15,
    alignItems: "center",
  },
  mainContentText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#424242",
    marginBottom: 4,
  },
  citationText: {
    fontSize: 14,
    color: "#AD1457",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
