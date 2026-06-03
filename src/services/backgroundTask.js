import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import { fetchRandomQuote }
from './quoteService';

import {
  loadQuotes,
  saveQuotes,
}
from '../storage/quoteStorage';

const TASK_NAME =
  'QUOTE_BACKGROUND_FETCH';

TaskManager.defineTask(
  TASK_NAME,
  async () => {

    try {

      const quote =
        await fetchRandomQuote();

      if (!quote) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
      }

      const existingQuotes =
        await loadQuotes();

      const updatedQuotes = [
        {
          id: Date.now().toString(),
          ...quote,
        },
        ...existingQuotes,
      ];

      await saveQuotes(
        updatedQuotes
      );

      return BackgroundFetch.BackgroundFetchResult.NewData;

    } catch (error) {

      console.log(error);

      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  }
);

export const registerBackgroundTask =
  async () => {

    try {

      await BackgroundFetch.registerTaskAsync(
        TASK_NAME,
        {
          minimumInterval: 15 * 60,
          stopOnTerminate: false,
          startOnBoot: true,
        }
      );

      console.log(
        'Background Task Registered'
      );

    } catch (error) {

      console.log(error);

    }
  };