import AsyncStorage from '@react-native-async-storage/async-storage';

const QUOTE_KEY = '@latest_quote';

export const saveQuote = async (quote) => {
  try {
    await AsyncStorage.setItem(
      QUOTE_KEY,
      JSON.stringify(quote)
    );
  } catch (error) {
    console.log('Save Error:', error);
  }
};

export const loadQuote = async () => {
  try {
    const data = await AsyncStorage.getItem(QUOTE_KEY);

    return data ? JSON.parse(data) : null;

  } catch (error) {
    console.log('Load Error:', error);
    return null;
  }
};