import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function ScreenWrapper({ loading, error, children, progressDuration = 30000 }) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading && !error) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: progressDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [loading, error, progressDuration]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load content</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Progress Bar */}
      <View style={styles.progressBarWrapper}>
        <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarWrapper: {
    height: 6,
    marginHorizontal: 20,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00796B",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
