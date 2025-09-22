import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { API_BASE } from "../constants";
import { getDidYouKnow } from "../utils/api";

export default function DidYouKnowScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    getDidYouKnow()
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
        <ThemedText>⚠️ Failed to load Did You Know</ThemedText>
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
          <ThemedText style={styles.headerSubtitle}>Distractions=No No!</ThemedText>
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
            <View style={styles.didYouKnowBubble}>
              <View style={styles.lightbulbIcon}>
                <Ionicons name="bulb-outline" size={30} color="#FFD700" />
              </View>
              <ThemedText style={styles.didYouKnowText}>DID YOU KNOW?</ThemedText>
            </View>
          </View>
        )}

        <View style={styles.cardSection}>
          <View style={styles.cardContentWrapper}>
            {data.cause_and_effect && (
              <View style={styles.causeEffectRow}>
                <View style={styles.causeEffectBox}>
                  <ThemedText style={styles.causeEffectLabel}>
                    {data.cause_and_effect.cause_label || "Eating with distractions"}
                  </ThemedText>
                </View>
                <View style={styles.circleDivider}>
                  <ThemedText style={styles.circleDividerText}>&#8594;</ThemedText>
                </View>
                <View style={styles.causeEffectBox}>
                  <ThemedText style={styles.causeEffectLabel}>
                    {data.cause_and_effect.effect_label || "Higher rates of healthy food refusal"}
                  </ThemedText>
                </View>
              </View>
            )}

            <ThemedText style={styles.mainContentText}>
              {data.content ||
                "One study found that kids were twice as likely to become picky eaters when they ate with distractions"}
            </ThemedText>

            {data.citation?.url && (
              <ThemedText
                style={styles.citationText}
                onPress={() => Linking.openURL(data.citation.url)}
              >
                {data.citation.label || "Journal of Applied Developmental Development Psychology"}
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
    // Ensure full width on web, and potentially limit max-width for content
    maxWidth: Platform.OS === 'web' ? 500 : '100%', // Limit width for web view
    alignSelf: Platform.OS === 'web' ? 'center' : 'auto', // Center on web
    height: Platform.OS === 'web' ? '100vh' : '100%', // Take full viewport height on web
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A2E44",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 50 : 12, // Apply padding top for iOS safe area only
    height: Platform.OS === 'web' ? 70 : 'auto', // Fixed height for web header
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
    backgroundColor: '#FFF',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
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
  mainContentText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 15,
    color: "#424242",
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
  activityIndicator: {
    marginTop: -80,
  },
});