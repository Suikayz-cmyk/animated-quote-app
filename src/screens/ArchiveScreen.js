import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ArchiveScreen({
  archivedQuotes,
  onBack,
}) {

  return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
        >
            <Text>Back</Text>
        </TouchableOpacity>

      <Text style={styles.title}>
        Archived Quotes
      </Text>

      <FlatList
        data={archivedQuotes}
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

  backButton: {
    marginBottom: 30,
 },

});