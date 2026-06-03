import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';

import SwipeableListItem from '../components/SwipeableListItem';

import { fetchRandomQuote } from '../services/quoteService';
import { registerBackgroundTask,} from '../services/backgroundTask';

import {
  loadQuotes,
  saveQuotes,
  loadArchivedQuotes,
  saveArchivedQuotes,
} from '../storage/quoteStorage';

export default function HomeScreen({ navigation }) {

  const [quotes, setQuotes] = useState([]);
  const [archivedQuotes, setArchivedQuotes] = useState([]); 

  const handleDelete = async (id) => {
    const updatedQuotes =
      quotes.filter(
        item => item.id !== id
      );

    setQuotes(updatedQuotes);
    await saveQuotes(updatedQuotes);
  };

  const handleArchive =
    async (id) => {
      const quoteToArchive =
        quotes.find(
          item => item.id === id
        );

      if (!quoteToArchive) return;

      const updatedArchives = [
        quoteToArchive,
        ...archivedQuotes,
      ];

      const updatedQuotes =
        quotes.filter(
          item => item.id !== id
        );

      setArchivedQuotes(
        updatedArchives
      );

      setQuotes(
        updatedQuotes
      );

      await saveArchivedQuotes(
        updatedArchives
      );

      await saveQuotes(
        updatedQuotes
      );
    };

  const handleNewQuote = async () => {
    const newQuote =
      await fetchRandomQuote();

    if (!newQuote) return;

    const quoteItem = {
      id: Date.now().toString(),
      ...newQuote,
    };

    const updatedQuotes = [
      quoteItem,
      ...quotes,
    ];
    setQuotes(updatedQuotes);
    await saveQuotes(updatedQuotes);
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await registerBackgroundTask();

    const savedQuotes =
      await loadQuotes();

    const archives =
      await loadArchivedQuotes();

    setArchivedQuotes(archives);

    if (savedQuotes.length > 0) {

      setQuotes(savedQuotes);
      return;

    }

    const firstQuote =
      await fetchRandomQuote();

    if (!firstQuote) return;

    const starterData = [
      {
        id: Date.now().toString(),
        ...firstQuote,
      },
    ];

    await saveQuotes(starterData);

    setQuotes(starterData);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        QuoteFlow
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNewQuote}
      >
        <Text style={styles.buttonText}>
          New Quote
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            'Archive'
          )
        }
      >
        <Text style={styles.buttonText}>
          Archives
        </Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {quotes.map(item => (
          <SwipeableListItem
            key={item.id}
            id={item.id}
            quote={`${item.text}\n\n- ${item.author}`}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  listContainer: {
    flex: 1,
  },

});