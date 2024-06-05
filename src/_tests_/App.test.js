import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  // test that the App component renders list of events, CitySearch, and NumberOfEvents
  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

// integration test for App with CitySearch and EventList
describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });

    // adding my own integration test for NOE plus EventList from original code below
    // integration test for App with NumberOfEvents and EventList
    test('renders the correct number of events when the user changes the number of events', async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      // reference the NumberOfEvents component and input element
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events-input');
      const NumberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole('textbox');

      // simulate user typing "10" in the NumberOfEvents input element after backspacing the default value of "32"
      await user.type(NumberOfEventsInput, "{backspace}{backspace}'10");

      // queries the EventList component and all rendered event items
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole('listitem');

      // get all events and filter to only the first 10
      const allEvents = await getEvents();
      const firstTenEvents = allEvents.slice(0, 10);

      // compares the number of rendered event items to the first 10 events
      expect(allRenderedEventItems.length).toBe(firstTenEvents.length);
    });
  });
});

// original code, still failing 2-3 tests

// import { render, screen, within } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { getEvents, NumberOfEvents } from '../api';
// import App from '../App';

// describe('<App /> component', () => {
//   let AppDOM;
//   // render the App component before each test
//   beforeEach(() => {
//     render(<App />);
//   });

//   // test that the App component renders correctly
//   test('renders list of events', () => {
//     expect(screen.getByTestId('event-list')).toBeInTheDocument();
//   });

//   // test that the CitySearch component renders correctly
//   test('render CitySearch', () => {
//     expect(screen.getByTestId('city-search')).toBeInTheDocument();
//   });

//   // test that the NumberOfEvents component renders correctly
//   test('render NumberOfEvents', () => {
//     expect(screen.getByTestId('number-of-events')).toBeInTheDocument();
//   });
// });

// // test that App integrates correctly with CitySearch and EventList
// describe('<App /> integration', () => {});
// test('renders a list of events matching the city selected by the user', async () => {
//   const user = userEvent.setup();
//   const AppComponent = render(<App />);
//   const AppDOM = AppComponent.container.firstChild;

//   // reference the CitySearch component and input element
//   const CitySearchDOM = AppDOM.querySelector('#city-search');
//   const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

//   // simulate user typing "Berlin" in the CitySearch input element, then selecting the Berlin suggestion
//   await user.type(CitySearchInput, 'Berlin');
//   const berlinSuggestionItem =
//     within(CitySearchDOM).queryByText('Berlin, Germany');
//   await user.click(berlinSuggestionItem);

//   // queries the EventList component and all rendered event items, then filters the events to only those in Berlin
//   const EventListDOM = AppDOM.querySelector('#event-list');
//   const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

//   // get all events and filter to only those in Berlin
//   const allEvents = await getEvents();
//   const berlinEvents = allEvents.filter(
//     (event) => event.location === 'Berlin, Germany'
//   );

//   // compares the number of rendered event items to the number of events in Berlin
//   expect(allRenderedEventItems.length).toBe(berlinEvents.length);

//   // test that all rendered events have the correct location
//   allRenderedEventItems.forEach((event) => {
//     expect(event.textContent).toContain('Berlin, Germany');
//   });

//   // test that App integrates correctly with NumberOfEvents and EventList
//   test('renders the correct number of events when the user changes the number of events', async () => {
//     const user = userEvent.setup();
//     const AppComponent = render(<App />);
//     const AppDOM = AppComponent.container.firstChild;

//     // reference the NumberOfEvents component and input element
//     const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
//     const NumberOfEventsInput =
//       within(NumberOfEventsDOM).queryByRole('textbox');

//     // simulate user typing "10" in the NumberOfEvents input element after backspacing the default value of "32"
//     await user.type(NumberOfEventsInput, "{backspace}{backspace}'10");

//     // queries the EventList component and all rendered event items
//     const EventListDOM = AppDOM.querySelector('#event-list');
//     const allRenderedEventItems =
//       within(EventListDOM).queryAllByRole('listitem');

//     // get all events and filter to only the first 10
//     const allEvents = await getEvents();
//     const firstTenEvents = allEvents.slice(0, 10);

//     // compares the number of rendered event items to the first 10 events
//     expect(allRenderedEventItems.length).toBe(firstTenEvents.length);
//   });
// });
