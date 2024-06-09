import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  // test that CitySearch text input renders correctly
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  // test that suggestions list is hidden by default
  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  // test that suggestions list appears when city textbox gains focus
  test('renders a list of suggestions when city text box gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);

    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  // test that suggestions list updates correctly when user types in city textbox
  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  // test that suggestion list updates correctly when user types in city textbox
  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

// test that CitySearch integrates correctly with App.js
describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});

//
//
// original code
// import { render, within, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import CitySearch from '../components/CitySearch';
// import { getEvents, extractLocations } from '../api';
// import mockData from '../mock-data';
// import App from '../App';

// describe('<CitySearch /> component', () => {
//   let CitySearchComponent;
//   beforeEach(() => {
//     CitySearchComponent = render(<CitySearch allLocations={[]} />);
//   });

//   // test that CitcySearch text input renders correctly
//   test('renders text input', async () => {
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     render(<CitySearch allLocations={allLocations} />);
//     const cityTextBox = screen.queryAllByRole('textbox');
//     expect(cityTextBox).toBeInTheDocument();
//     expect(cityTextBox).toHaveClass('city');
//   });

//   // test that suggestions list is hidden by default
//   test('suggestions list is hidden by default', async () => {
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     render(<CitySearch allLocations={allLocations} />);
//     const suggestionList = screen.queryAllByRole('list');
//     expect(suggestionList).not.toBeInTheDocument();
//   });

//   // test that suggestions list appears when city textbox gains focus
//   test('renders a list of suggestions when city textbox gains focus', async () => {
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     render(<CitySearch allLocations={allLocations} />);

//     const cityTextBox = screen.getByTestId('city-search-input');
//     await fireEvent.focus(cityTextBox);
//     const suggestionList = screen.getByTestId('suggestions');
//     expect(suggestionList).toBeInTheDocument();
//     expect(suggestionList).toHaveClass('suggestions');
//   });

//   // test that suggestions list contains the correct number of suggestions
//   test('updates list of suggestions correctly when user types in city textbox', async () => {
//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);
//     render(<CitySearch allLocations={allLocations} />);

//     // user types "Berlin" in city textbox
//     const cityTextBox = screen.queryAllByRole('textbox');
//     await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

//     // filter allLocations to locations matching "Berlin"
//     const suggestions = allLocations
//       ? allLocations.filter((location) => {
//           return (
//             location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
//           );
//         })
//       : [];

//     // get all <li> elements inside the suggestion list
//     const suggestionListItems = screen.queryAllByRole('listitem');
//     expect(suggestionListItems).toHaveLength(suggestions.length + 1);
//     for (let i = 0; i < suggestions.length; i += 1) {
//       expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
//     }
//   });

//   // test that the suggestion list is hidden when the user clicks on a suggestion
//   test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
//     const allLocations = extractLocations(mockData);
//     render(<CitySearch allLocations={allLocations} />);

//     const cityTextBox = screen.queryAllByRole('textbox');
//     await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

//     // the suggestion's textContent look like this: "Berlin, Germany"
//     const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
//     await fireEvent.click(BerlinGermanySuggestion);

//     expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
//   });

//   // test that the suggestion list is hidden when the user clicks on a suggestion, helps to test the handleItemClicked function
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

// // test that CitySearch integrates correctly with App.js
// describe('<CitySearch /> integration', () => {
//   test('renders suggestions list when the app is rendered.', async () => {
//     const user = userEvent.setup();
//     const AppComponent = render(<App />);
//     const AppDOM = AppComponent.container.firstChild;

//     const CitySearchDOM = AppDOM.querySelector('#city-search');
//     const cityTextBox = within(CitySearchDOM).queryAllByRole('textbox');
//     await user.click(cityTextBox);

//     const allEvents = await getEvents();
//     const allLocations = extractLocations(allEvents);

//     // the suggestion list should contain all locations plus one for "See all cities"
//     const suggestionListItems =
//       within(CitySearchDOM).queryAllByRole('listitem');
//     expect(suggestionListItems.length).toBe(allLocations.length + 1);
//   });
// });
