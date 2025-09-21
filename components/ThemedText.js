import React from "react";
import { Text, StyleSheet } from "react-native";

// type="title" makes text bigger and bold
export function ThemedText({ children, style, type = "normal", ...props }) {
  return (
    <Text
      style={[
        type === "title" ? styles.title : styles.normal,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", color: "#000" },
  normal: { fontSize: 16, color: "#333" },
});
