import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

import AnimatedCard from '../components/AnimatedCard';

import {
  saveQuote,
  loadQuote,
} from '../storage/quoteStorage';

export default function HomeScreen() {

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeQuote();
  }, []);

  const initializeQuote = async () => {

    const storedQuote = await loadQuote();

    if (storedQuote) {

      setQuote(storedQuote);

    } else {

      const defaultQuote =
        'Jangan pernah menunda-nunda, karena kesempatan hanya datang sekali.';

      await saveQuote(defaultQuote);

      setQuote(defaultQuote);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

});