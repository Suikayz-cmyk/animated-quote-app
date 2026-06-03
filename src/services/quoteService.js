import AsyncStorage from '@react-native-async-storage/async-storage';

const QUOTES_KEY = '@quotes';

export const fetchRandomQuote = async () => {
  try {

    const response = await fetch(
      'https://dummyjson.com/quotes/random'
    );

    const data = await response.json();

    console.log('API DATA:', data);

    return {
      text: data.quote,
      author: data.author,
    };

  } catch (error) {

    console.log('Quote API Error:', error);

    return null;
  }
};

export const saveQuotes = async (quotes) => {
  try {
    await AsyncStorage.setItem(
      QUOTES_KEY,
      JSON.stringify(quotes)
    );
  } catch (error) {
    console.log(error);
  }
};

export const loadQuotes = async () => {
  try {
    const data =
      await AsyncStorage.getItem(QUOTES_KEY);

    return data
      ? JSON.parse(data)
      : [];

  } catch (error) {

    console.log(error);

    return [];
  }
};