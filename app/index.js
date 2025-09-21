import { Redirect } from "expo-router";

export default function HomeRedirect() {
  // Redirect root `/` to your first tab: /flashcard
  return <Redirect href="/flashcard" />;
}
