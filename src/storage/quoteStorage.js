import AsyncStorage from '@react-native-async-storage/async-storage';

const QUOTE_KEY = '@latest_quote';
const ARCHIVE_KEY = '@archived_quotes';

export const saveQuote = async (quote) => {
  await AsyncStorage.setItem(
    QUOTE_KEY,
    JSON.stringify(quote)
  );
};

export const loadQuote = async () => {
  const data =
    await AsyncStorage.getItem(QUOTE_KEY);

  return data
    ? JSON.parse(data)
    : null;
};

export const saveArchivedQuotes =
  async (quotes) => {

    try {

      await AsyncStorage.setItem(
        ARCHIVE_KEY,
        JSON.stringify(quotes)
      );

    } catch (error) {

      console.log(error);

    }
  };

  export const loadArchivedQuotes =
  async () => {

    try {

      const data =
        await AsyncStorage.getItem(
          ARCHIVE_KEY
        );

      return data
        ? JSON.parse(data)
        : [];

    } catch (error) {

      console.log(error);

      return [];
    }
  };