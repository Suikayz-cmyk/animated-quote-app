import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useEffect, useState } from 'react';

import { loadArchivedQuotes } from '../storage/quoteStorage';

export default function ArchiveScreen() {

const [quotes,setQuotes] = useState([]);

useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  const data =
    await loadArchivedQuotes();
  setQuotes(data);
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Archived Quotes ({quotes.length})
      </Text>

      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text>
              {item.text}
            </Text>

            <Text
              style={styles.author}
            >
              - {item.author}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  author: {
    marginTop: 10,
    fontStyle: 'italic',
  },

});