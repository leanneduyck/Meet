// // trying CF GH code
// import { render, within, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import CitySearch from '../components/CitySearch';
// import App from '../App';
// import { extractLocations, getEvents } from '../api';

// describe('<CitySearch /> component', () => {
//   let CitySearchComponent;
//   beforeEach(() => {
//     CitySearchComponent = render(<CitySearch allLocations={[]} />);
//   });

//   test('renders text input', () => {
//     const cityTextBox = CitySearchComponent.queryByRole('textbox');
//     expect(cityTextBox).toBeInTheDocument();
//     expect(cityTextBox).toHaveClass('city');
//   });

//   test('suggestions list is hidden by default', () => {
//     const suggestionList = CitySearchComponent.queryByRole('list');
//     expect(suggestionList).not.toBeInTheDocument();
//   });

//   test('renders a list of suggestions when city text box gains focus', async () => {
//     const user = userEvent.setup();
//     const cityTextBox = CitySearchComponent.queryByRole('textbox');
//     await user.click(cityTextBox);

//     const suggestionList = CitySearchComponent.queryByRole('list');
//     expect(suggestionList).toBeInTheDocument();
//     expect(suggestionList).toHaveClass('suggestions');
//   });

//   test('updates list of suggestions correctly when user types in city textbox', async () => {
//     const user = userEvent.setup();
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

//     // user types "Berlin" in city textbox
//     const cityTextBox = CitySearchComponent.queryByRole('textbox');
//     await user.type(cityTextBox, 'Berlin');

//     // filter allLocations to locations matching "Berlin"
//     const suggestions = allLocations
//       ? allLocations.filter((location) => {
//           return (
//             location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
//           );
//         })
//       : [];

//     // get all <li> elements inside the suggestion list
//     const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
//     expect(suggestionListItems).toHaveLength(suggestions.length + 1);
//     for (let i = 0; i < suggestions.length; i += 1) {
//       expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
//     }
//   });

//   test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
//     const user = userEvent.setup();
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     CitySearchComponent.rerender(
//       <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
//     );

//     const cityTextBox = CitySearchComponent.queryByRole('textbox');
//     await user.type(cityTextBox, 'Berlin');

//     // the suggestion's textContent look like this: "Berlin, Germany"
//     const BerlinGermanySuggestion =
//       CitySearchComponent.queryAllByRole('listitem')[0];

//     await user.click(BerlinGermanySuggestion);

//     expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
//   });
// });

// describe('<CitySearch /> integration', () => {
//   test('renders suggestions list when the app is rendered.', async () => {
//     const user = userEvent.setup();
//     const AppComponent = render(<App />);
//     const AppDOM = AppComponent.container.firstChild;

//     const CitySearchDOM = AppDOM.querySelector('#city-search');
//     const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
//     await user.click(cityTextBox);

//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);

//     await waitFor(() => {
//       const suggestionListItems =
//         within(CitySearchDOM).queryAllByRole('listitem');
//       expect(suggestionListItems.length).toBe(allLocations.length + 1);
//     });
//   });
// });

// my original code

//

// chatGPT suggestions
import { render, screen, fireEvent, within } from '@testing-library/react'; // Update imports
import userEvent from '@testing-library/user-event'; // Import userEvent

import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';
import mockData from '../mock-data';
import App from '../App';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  // Test that CitySearch text input renders correctly
  test('renders text input', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox'); // Use getByRole to get a single element
    expect(cityTextBox).toBeInTheDocument(); // Assert that the text input is in the document
    expect(cityTextBox).toHaveClass('city'); // Check if the input has the correct class
  });

  // Test that suggestions list is hidden by default
  test('suggestions list is hidden by default', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    const suggestionList = screen.queryByRole('list'); // Use queryByRole to get a single element
    expect(suggestionList).not.toBeInTheDocument(); // Assert that the list is not in the document
  });

  // Test that suggestions list appears when city textbox gains focus
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

  // Test that suggestions list updates correctly when user types in city textbox
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin'); // Use userEvent for typing

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes('BERLIN')
    );

    const suggestionListItems = screen.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });

  // Test that suggestion text renders in the textbox upon clicking on the suggestion
  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const allLocations = extractLocations(mockData);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin'); // Use userEvent for typing

    const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
    await fireEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  // Test that the suggestion list is hidden when the user clicks on a suggestion
  test('suggestion list is hidden when the user clicks on a suggestion', async () => {
    const allLocations = extractLocations(mockData);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin'); // Use userEvent for typing

    const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
    await fireEvent.click(BerlinGermanySuggestion);

    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });
});

// Integration test for CitySearch and App.js
describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered', async () => {
    render(<App />);

    const CitySearchComponent = screen.getByTestId('city-search');
    const cityTextBox = within(CitySearchComponent).getByRole('textbox');

    await userEvent.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = screen.queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
