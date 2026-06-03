import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default function AnimatedCard({ quote }) {

  // Fade & slide animation
  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const translateY = useRef(
    new Animated.Value(50)
  ).current;

  // Scale animation
  const scale = useRef(
    new Animated.Value(1)
  ).current;

  // Rotation animation
  const rotate = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  const handlePress = () => {

    Animated.sequence([

      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(scale, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),

    ]).start();

  };

  const handleLongPress = () => {

    rotate.setValue(0);

    Animated.timing(rotate, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [
              { translateY },
              { scale },
              { rotate: rotateInterpolate },
            ],
          },
        ]}
      >
        <Text style={styles.quote}>
          {quote}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  quote: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },

});