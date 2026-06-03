export const fetchRandomQuote = async () => {
  try {

    const response = await fetch(
      'https://dummyjson.com/quotes/random'
    );

    const data = await response.json();

    return {
      text: data.quote,
      author: data.author,
    };

  } catch (error) {

    console.log('Quote API Error:', error);

    return null;
  }
};