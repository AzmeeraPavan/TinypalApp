import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { API_BASE } from "../constants";
import { getDidYouKnow } from "../utils/api";


export default function DidYouKnowScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDidYouKnow()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error || !data)
    return (
      <ThemedView style={styles.center}>
        <ThemedText>⚠️ Failed to load Did You Know</ThemedText>
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

      {data.citation?.url && (
        <ThemedText
          style={styles.citation}
          onPress={() => Linking.openURL(data.citation.url)}
        >
          Source: {data.citation.label}
        </ThemedText>
      )}

      {data.cause_and_effect && (
        <View style={styles.causeEffect}>
          <ThemedText style={styles.cause}>
            Cause: {data.cause_and_effect.cause}
          </ThemedText>
          <ThemedText style={styles.effect}>
            Effect: {data.cause_and_effect.effect}
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  image: { width: "100%", height: 200, borderRadius: 12 },
  content: { fontSize: 16, lineHeight: 22 },
  citation: { fontSize: 14, color: "blue", textDecorationLine: "underline" },
  causeEffect: { marginTop: 12, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8 },
  cause: { fontWeight: "bold" },
  effect: {},
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
