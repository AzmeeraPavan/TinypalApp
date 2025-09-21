import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { API_BASE } from "../constants";
import { getFlashcard } from "../utils/api";


export default function FlashcardScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getFlashcard()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error || !data)
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load Flashcard</ThemedText>
      </ThemedView>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.image_url && (
<Image
  source={{
    uri: data.image_url.startsWith("http")
      ? data.image_url
      : `${API_BASE}${data.image_url}`, // ✅ prepend API_BASE
  }}
  style={styles.image}
  contentFit="cover"
/>
      )}
      <ThemedText type="title">{data.title}</ThemedText>
      <ThemedText style={styles.content}>{data.content}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  image: { width: "100%", height: 200, borderRadius: 12 },
  content: { fontSize: 16, lineHeight: 22 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
