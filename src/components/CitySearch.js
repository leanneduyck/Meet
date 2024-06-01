import { useState, useEffect } from 'react';

const CitySearch = ({ allLocations }) => {
  // state to show or hide suggestions, store the user input, and store the list of suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // function to handle changes to the text input field
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setShowSuggestions(true)
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  // function to handle when a user clicks on a suggestion, which sets the query to the suggestion and hides the list
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  // returns a text input field and a list of suggestions, which are hidden by default, and appear when the text input field gains focus
  // and are updated as the user types in the text input field, and a list item to see all cities
  return (
    <div id="city-search" data-testid="city-search">
      <input
        data-testid="city-search-input"
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions" data-testid="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li data-testid={"suggestion"} onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li data-testid={"suggestion"} key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}{' '}
    </div>
  );
};

export default CitySearch;
