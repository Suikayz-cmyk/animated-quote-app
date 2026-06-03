import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

import SwipeableListItem from '../components/SwipeableListItem';
import { fetchRandomQuote } from '../services/quoteService';

export default function HomeScreen() {

  const [quotes, setQuotes] = useState([
    {
      id: '1',
      text: 'Stay hungry, stay foolish.',
      author: 'Steve Jobs',
    },
    {
      id: '2',
      text: 'Knowledge is power.',
      author: 'Francis Bacon',
    },
    {
      id: '3',
      text: 'Never stop learning.',
      author: 'Unknown',
    },
  ]);

  const handleDelete = (id) => {
    setQuotes(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const handleArchive = (id) => {
    console.log('Archived:', id);

    setQuotes(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const handleNewQuote = async () => {

    const newQuote = await fetchRandomQuote();

    if (!newQuote) return;

    const quoteItem = {
      id: Date.now().toString(),
      text: newQuote.text,
      author: newQuote.author,
    };

    setQuotes(prev => [
      quoteItem,
      ...prev,
    ]);
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