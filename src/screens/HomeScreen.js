import { View, StyleSheet, TouchableOpacity, Text, RefreshControl, ScrollView, } from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    setLoading(true);

    const newQuote =
      await fetchRandomQuote();

    if (!newQuote) {
      setLoading(false);
      return;
    }

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
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleNewQuote();
    setRefreshing(false);
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
      
      <Text style={styles.subtitle}>
        Daily Inspiration
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNewQuote}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'New Quote'}
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

      <Text style={styles.counter}>
        Total Quotes: {quotes.length}
      </Text>

      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {quotes.length === 0 ? (

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No quotes available
            </Text>
          </View>

        ) : (

        quotes.map(item => (
          <SwipeableListItem
            key={item.id}
            id={item.id}
            quote={`${item.text}\n\n- ${item.author}`}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        ))
        )}
      </ScrollView>

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
    marginBottom: 10,
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: '#777',
  },

  counter: {
    textAlign: 'center',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555'
  },

});