import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function Header({ title, subtitle }) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        <ThemedText style={styles.headerSubtitle}>{subtitle}</ThemedText>
      </View>
      <View style={styles.placeholderIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A2E44",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTextContainer: { flex: 1, alignItems: "center" },
  headerTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  headerSubtitle: { color: "#A0AEC0", fontSize: 12 },
  placeholderIcon: { width: 24, height: 24 },
});
