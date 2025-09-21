import { Platform } from "react-native";

export const API_BASE =
  Platform.OS === "web"
    ? "/api" // use Metro proxy on web
    : "https://genai-images-4ea9c0ca90c8.herokuapp.com"; // full URL for mobile
