import AsyncStorage from '@react-native-async-storage/async-storage';

const QUOTE_KEY = '@latest_quote';

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