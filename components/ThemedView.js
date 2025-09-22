import React from "react";
import { StyleSheet, View } from "react-native";

// Simple wrapper for consistent padding & background
export function ThemedView({ children, style, ...props }) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 16,
  },
});
