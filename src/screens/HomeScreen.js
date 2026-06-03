import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        QuoteFlow
      </Text>

      <Text style={styles.quote}>
        "Jangan pernah menunda-nunda, karena kesempatan hanya datang sekali."
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