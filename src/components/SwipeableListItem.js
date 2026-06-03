import { Dimensions, StyleSheet, Text, View } from 'react-native';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SwipeableListItem({
  quote,
}) {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()

    .onUpdate((event) => {
      translateX.value = event.translationX;
    })

    .onEnd(() => {
      if (translateX.value > 120) {
        translateX.value = withSpring(120);
      } else if (translateX.value < -120) {
        translateX.value = withSpring(-120);
      } else {
        translateX.value = withSpring(0);
      }

    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <View style={styles.container}>

      {translateX.value > 0 && (
        <View style={styles.archiveContainer}>
          <Text style={styles.actionText}>
            Archive
          </Text>
        </View>
      )}

      {translateX.value < 0 && (
        <View style={styles.deleteContainer}>
          <Text style={styles.actionText}>
            Delete
          </Text>
        </View>
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
          ]}
        >
          <Text style={styles.quote}>
            {quote}
          </Text>
        </Animated.View>
      </GestureDetector>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  quote: {
    fontSize: 16,
    textAlign: 'center',
  },

  archiveContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    borderRadius: 16,
  },

  deleteContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30,
    borderRadius: 16,
  },

  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },

});