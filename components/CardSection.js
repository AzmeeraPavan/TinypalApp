import { Linking, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export function CardSection({ content, title, causeEffect, citation, backgroundColor="#FCE4EC" }) {
  return (
    <View style={[styles.cardSection, { backgroundColor }]}>
      <View style={styles.cardContentWrapper}>
        {causeEffect && (
          <View style={styles.causeEffectRow}>
            <View style={styles.causeEffectBox}>
              <ThemedText style={styles.causeEffectLabel}>{causeEffect.cause_label}</ThemedText>
            </View>
            <View style={styles.circleDivider}>
              <ThemedText style={styles.circleDividerText}>→</ThemedText>
            </View>
            <View style={styles.causeEffectBox}>
              <ThemedText style={styles.causeEffectLabel}>{causeEffect.effect_label}</ThemedText>
            </View>
          </View>
        )}
        {title && <ThemedText type="title" style={styles.cardTitle}>{title}</ThemedText>}
        {content && content.split("\n").map((line, idx) => (
          <ThemedText key={idx} style={styles.cardContent}>{line}</ThemedText>
        ))}
        {citation?.url && (
          <ThemedText style={styles.citationText} onPress={() => Linking.openURL(citation.url)}>
            {citation.label}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardSection: { borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius:30, borderBottomRightRadius:30, flex: 1, paddingTop: 80 },
  cardContentWrapper: { marginHorizontal: 20, borderRadius: 20, padding: 20, alignItems: "center" },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#00796B", marginBottom: 10 },
  cardContent: { fontSize: 16, lineHeight: 24, color: "#424242", marginBottom: 4 },
  causeEffectRow: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 20, width: "100%" },
  causeEffectBox: { backgroundColor: "#F48FB1", borderRadius: 15, paddingVertical: 10, paddingHorizontal: 15, width: "40%", alignItems: "center", justifyContent: "center", minHeight: 80 },
  causeEffectLabel: { fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center" },
  circleDivider: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#EC407A", justifyContent: "center", alignItems: "center", marginHorizontal: 10 },
  circleDividerText: { color: "white", fontSize: 24, fontWeight: "bold", transform: [{ rotateY: "180deg" }] },
  citationText: { fontSize: 14, color: "#AD1457", textDecorationLine: "underline", textAlign: "center" },
});
