import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';
import mockData from '../mock-data';

describe('<CitySearch /> component', () => {
  // test that CitcySearch text input renders correctly
  test('renders text input', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);
    const cityTextBox = screen.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  // test that suggestions list is hidden by default
  test('suggestions list is hidden by default', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  // test that suggestions list appears when city textbox gains focus
  test('renders a list of suggestions when city textbox gains focus', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);
   
    const cityTextBox = screen.getByTestId('city-search-input');
    await fireEvent.focus(cityTextBox);
    const suggestionList = screen.getByTestId('suggestions');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  // test that suggestions list contains the correct number of suggestions
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    // user types "Berlin" in city textbox
    const cityTextBox = screen.queryByRole('textbox');
    await fireEvent.change(cityTextBox, { target: { value :'Berlin'}});

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = screen.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  // test that the suggestion list is hidden when the user clicks on a suggestion
  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const allLocations = extractLocations(mockData);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.queryByRole('textbox');
    await fireEvent.change(cityTextBox, { target: {value: 'Berlin'}});

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion =
      screen.queryAllByRole('listitem')[0];
    await fireEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
