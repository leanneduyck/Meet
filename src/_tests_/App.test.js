import { render, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

jest.setTimeout(10000);

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

// integration test for App with CitySearch, EventList, and NOE
describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, 'Berlin, Germany');

    // reference the NumberOfEvents component and input element
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole('textbox');

    // simulate user typing "15" in the NumberOfEvents input element after backspacing the default value of "32"
    await fireEvent.change(NumberOfEventsInput, { target: { value: '15' } });

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

    expect(allRenderedEventItems.length).toBe(32);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });
});
