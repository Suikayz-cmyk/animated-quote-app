import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        QuoteFlow
      </Text>

      <Text style={styles.quote}>
        
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  quote: {
    textAlign: 'center',
    fontSize: 18,
  },
});

import { View, StyleSheet, Text } from 'react-native';
import AnimatedCard from '../components/AnimatedCard';

export default function HomeScreen() {

  const quote =
    'Jangan pernah menunda-nunda, karena kesempatan hanya datang sekali.';

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        QuoteFlow
      </Text>

      <AnimatedCard quote={quote} />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

});