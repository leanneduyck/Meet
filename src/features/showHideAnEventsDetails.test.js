import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  // feature 2a
  test('an event element is collapsed by default', ({ given, when, then }) => {
    given('the user has specified a city', () => {
      render(<App />);
      fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
        target: { value: 'New York' },
      });
    });

    when('the user views that city’s list of upcoming events', () => {
      fireEvent.click(screen.getByText('Search'));
    });

    then('the full event details are hidden by default', () => {
      const eventDetails = screen.queryByText('show details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  // feature 2b
  test('a user can expand an event to see details', ({ given, when, then }) => {
    given('the user sees an interesting event', () => {
      render(<App />);
      fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
        target: { value: 'New York' },
      });
      fireEvent.click(screen.getByText('Search'));
    });

    when('the user clicks or selects that event', () => {
      fireEvent.click(screen.getAllByText('show details')[0]);
    });

    then('the full details are shown', () => {
      const eventDetails = screen.getByText('show details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  // feature 2c
  test('a user can collapse an event to hide details', ({
    given,
    when,
    then,
  }) => {
    given('the user has finished viewing the event details', () => {
      render(<App />);
      fireEvent.change(screen.getByPlaceholderText('Search for a city'), {
        target: { value: 'New York' },
      });
      fireEvent.click(screen.getByText('Search'));
      fireEvent.click(screen.getAllByText('show details')[0]);
    });

    when('the user clicks the exit button', () => {
      fireEvent.click(screen.getAllByText('hide details')[0]);
    });

    then('the user is returned to the full list of events', () => {
      const eventDetails = screen.queryByText('show details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});
