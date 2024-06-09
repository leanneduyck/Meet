import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App'; // Adjust the import according to your project structure

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  // feature 3a
  test('when a user has not specified a number, 32 events are shown by default', ({
    given,
    when,
    then,
  }) => {
    given(
      'the user has specified a certain city to search events and the user has not specified a certain number of events to display',
      () => {
        render(<App />);
        fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
          target: { value: 'Berlin' },
        });
      }
    );

    when('the user receives the list of events', () => {
      fireEvent.click(screen.getByText('Search'));
    });

    then('32 events are shown by default', async () => {
      const events = await screen.findAllByTestId('event');
      expect(events).toHaveLength(32);
    });
  });

  // feature 3b
  test('a user can change the number of events displayed', ({
    given,
    when,
    then,
  }) => {
    given(
      'the user has specified a certain city to search events and the user has specified a certain number of events to be displayed in a prompt under the search bar',
      () => {
        render(<App />);
        fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
          target: { value: 'Berlin' },
        });
        fireEvent.change(screen.getByPlaceholderText('Number of events'), {
          target: { value: '10' },
        });
      }
    );

    when('the user receives the list of events', () => {
      fireEvent.click(screen.getByText('Search for a city'));
    });

    then('that number of events will be shown', async () => {
      const events = await screen.findAllByTestId('event');
      expect(events).toHaveLength(10);
    });
  });
});
