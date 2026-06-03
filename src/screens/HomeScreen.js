import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

import SwipeableListItem from '../components/SwipeableListItem';

export default function HomeScreen() {

  const [quotes, setQuotes] = useState([
    {
      id: '1',
      text: 'Stay hungry, stay foolish.',
    },
    {
      id: '2',
      text: 'Knowledge is power.',
    },
    {
      id: '3',
      text: 'Never stop learning.',
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

  return (
    <View style={styles.container}>

      {quotes.map(item => (
        <SwipeableListItem
          key={item.id}
          id={item.id}
          quote={item.text}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});