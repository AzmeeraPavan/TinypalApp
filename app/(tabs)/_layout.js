// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="flashcard" options={{ title: "Flashcards" }} />
      <Tabs.Screen name="didYouKnow" options={{ title: "Did You Know" }} />
    </Tabs>
  );
}
