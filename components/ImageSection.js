import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { API_BASE } from "../constants";
import { ThemedText } from "./ThemedText";

export function ImageSection({ imageUrl, overlayType, number }) {
  if (!imageUrl) return null;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl.startsWith("http") ? imageUrl : `${API_BASE}${imageUrl}` }}
        style={styles.mainImage}
        contentFit="cover"
      />
      {overlayType === "number" && (
        <View style={styles.numberCircle}>
          <ThemedText style={styles.numberText}>{number || 1}</ThemedText>
        </View>
      )}
      {overlayType === "bubble" && (
        <View style={styles.didYouKnowBubble}>
          <View style={styles.lightbulbIcon}>
            <Ionicons name="bulb-outline" size={30} color="#FFD700" />
          </View>
          <ThemedText style={styles.didYouKnowText}>DID YOU KNOW?</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: { width: "100%", height: 300, position: "relative", marginBottom: -80 },
  mainImage: { width: "100%", height: "100%" },
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
    elevation: 3,
  },
  numberText: { fontSize: 30, fontWeight: "bold", color: "white" },
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
  lightbulbIcon: { marginRight: 10, backgroundColor: "#FFF", borderRadius: 18, width: 36, height: 36, justifyContent: "center", alignItems: "center" },
  didYouKnowText: { fontSize: 18, fontWeight: "bold", color: "#E53935" },
});
