import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../mock-data';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  // feature 1a
  test('when a user has not searched for any city, the user should see a list of upcoming events from all cities', ({
    given,
    when,
    then,
  }) => {
    given('a user has not searched for any city', () => {});

    let AppComponent;
    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then(
      'the user should see a list of upcoming events from all cities',
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');

        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems.length).toBe(32);
        });
      }
    );
  });

  // feature 1b
  test('when the main page is open, the user should see a list of suggestions when they search for a city', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    let CitySearchDOM;
    when('the user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, 'Berlin');
    });

    then(
      'the user should see a list of suggestions when they search for a city',
      async () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(2);
      }
    );
  });
});

// feature 1c
test('when the user selects a city from the list, their city should be changed to that city and the user should receive a list of upcoming events in that city', ({
  given,
  when,
  then,
}) => {
  let AppComponent;
  let AppDOM;
  let CitySearchDOM;
  let citySearchInput;
  given(
    'a user was typing “Berlin” in the city textbox and the list of suggested cities is showing',
    async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, 'Berlin');

      let suggestionListItems =
        within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2);
    }
  );

  let suggestionListItems;
  when('the user selects a city from the list', async () => {
    const user = userEvent.setup();
    suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    await user.click(suggestionListItems[0]);
  });

  then('their city should be changed to that city', () => {
    expect(citySearchInput.value).toBe('Berlin, Germany');
  });

  then(
    'and the user should receive a list of upcoming events in that city',
    async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();
      const berlinEvents = allEvents.filter(
        (event) => event.location === citySearchInput.value
      );
      expect(EventListItems).toHaveLength(berlinEvents.length);
    }
  );
});
