// // trying CF GH code
// import { render, within } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { getEvents } from '../api';
// import App from '../App';

// describe('<App /> component', () => {
//   let AppDOM;
//   beforeEach(() => {
//     AppDOM = render(<App />).container.firstChild;
//   });

//   test('renders list of events', () => {
//     expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
//   });

//   test('render CitySearch', () => {
//     expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
//   });

//   test('render NumberOfEvents', () => {
//     expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
//   });
// });

// describe('<App /> integration', () => {
//   test('renders a list of events matching the city selected by the user', async () => {
//     const user = userEvent.setup();
//     const AppComponent = render(<App />);
//     const AppDOM = AppComponent.container.firstChild;

//     const CitySearchDOM = AppDOM.querySelector('#city-search');
//     const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

//     await user.type(CitySearchInput, 'Berlin');
//     const berlinSuggestionItem =
//       within(CitySearchDOM).queryByText('Berlin, Germany');
//     await user.click(berlinSuggestionItem);

//     const EventListDOM = AppDOM.querySelector('#event-list');
//     const allRenderedEventItems =
//       within(EventListDOM).queryAllByRole('listitem');

//     const allEvents = await getEvents();
//     const berlinEvents = allEvents.filter(
//       (event) => event.location === 'Berlin, Germany'
//     );

//     expect(allRenderedEventItems.length).toBe(berlinEvents.length);

//     allRenderedEventItems.forEach((event) => {
//       expect(event.textContent).toContain('Berlin, Germany');
//     });
//   });
// });

// my original code, still failing 2 tests

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  // render the App component before each test
  beforeEach(() => {
    render(<App />);
  });

  // test that the App component renders correctly
  test('renders list of events', () => {
    expect(screen.getByTestId('event-list')).toBeInTheDocument();
  });

  // test that the CitySearch component renders correctly
  test('render CitySearch', () => {
    expect(screen.getByTestId('city-search')).toBeInTheDocument();
  });

  // test that the NumberOfEvents component renders correctly
  test('render NumberOfEvents', () => {
    expect(screen.getByTestId('number-of-events')).toBeInTheDocument();
  });
});

// test that App integrates correctly with CitySearch and EventList
describe('<App /> integration', () => {});
test('renders a list of events matching the city selected by the user', async () => {
  const user = userEvent.setup();
  const AppComponent = render(<App />);
  const AppDOM = AppComponent.container.firstChild;

  // reference the CitySearch component and input element
  const CitySearchDOM = AppDOM.querySelector('#city-search');
  const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

  // simulate user typing "Berlin" in the CitySearch input element, then selecting the Berlin suggestion
  await user.type(CitySearchInput, 'Berlin');
  const berlinSuggestionItem =
    within(CitySearchDOM).queryByText('Berlin, Germany');
  await user.click(berlinSuggestionItem);

  // queries the EventList component and all rendered event items, then filters the events to only those in Berlin
  const EventListDOM = AppDOM.querySelector('#event-list');
  const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

  // get all events and filter to only those in Berlin
  const allEvents = await getEvents();
  const berlinEvents = allEvents.filter(
    (event) => event.location === 'Berlin, Germany'
  );

  // compares the number of rendered event items to the number of events in Berlin
  expect(allRenderedEventItems.length).toBe(berlinEvents.length);

  // test that all rendered events have the correct location
  allRenderedEventItems.forEach((event) => {
    expect(event.textContent).toContain('Berlin, Germany');
  });
});
