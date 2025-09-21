import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const BASE_URL = "https://genai-images-4ea9c0ca90c8.herokuapp.com";

export default function FlashcardScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/flashcard")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Flashcard fetch error:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  if (error || !data) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load Flashcard</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.image_url && (
        <Image
          source={{
            uri: data.image_url.startsWith("http")
              ? data.image_url
              : `${BASE_URL}${data.image_url}`,
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
