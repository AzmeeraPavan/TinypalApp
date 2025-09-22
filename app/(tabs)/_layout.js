import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import DidYouKnowScreen from "./didYouKnow";
import FlashcardScreen from "./flashcard";

export default function SequentialScreens() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 2);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    progressWidth.setValue(0);
    Animated.timing(progressWidth, {
      toValue: 100,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [currentScreen]);

  const renderScreen = () => {
    if (currentScreen === 0)
      return <DidYouKnowScreen progressBar={<ProgressBar progressWidth={progressWidth} />} />;
    if (currentScreen === 1)
      return <FlashcardScreen progressBar={<ProgressBar progressWidth={progressWidth} />} />;
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
}

function ProgressBar({ progressWidth }) {
  return (
    <View style={styles.progressContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    height: 6,
    width: "90%",
    backgroundColor: "#eee",
    borderRadius: 3,
    marginVertical: 16,
    alignSelf: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1A2E44",
    borderRadius: 3,
  },
});
