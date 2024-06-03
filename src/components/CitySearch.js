// trying CF GH code
// import { useState, useEffect } from 'react';

// const CitySearch = ({ allLocations, setCurrentCity }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     setSuggestions(allLocations);
//   }, [`${allLocations}`]);

//   const handleInputChanged = (event) => {
//     const value = event.target.value;
//     const filteredLocations = allLocations
//       ? allLocations.filter((location) => {
//           return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//         })
//       : [];
//     setQuery(value);
//     setSuggestions(filteredLocations);
//   };

//   const handleItemClicked = (event) => {
//     const value = event.target.textContent;
//     setQuery(value);
//     setShowSuggestions(false);
//     setCurrentCity(value);
//   };

//   return (
//     <div id="city-search">
//       <input
//         type="text"
//         className="city"
//         placeholder="Search for a city"
//         value={query}
//         onFocus={() => setShowSuggestions(true)}
//         onChange={handleInputChanged}
//       />
//       {showSuggestions ? (
//         <ul className="suggestions">
//           {suggestions.map((suggestion) => {
//             return (
//               <li onClick={handleItemClicked} key={suggestion}>
//                 {suggestion}
//               </li>
//             );
//           })}
//           <li key="See all cities" onClick={handleItemClicked}>
//             <b>See all cities</b>
//           </li>
//         </ul>
//       ) : null}
//     </div>
//   );
// };

// export default CitySearch;

// my original code

import { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
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
    setShowSuggestions(true);
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  // function to handle when a user clicks on a suggestion, which sets the query to the suggestion and hides the list
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  // uses stringified value of allLocations to update the list of suggestions when allLocations changes
  // keeps failing, trying below code
  //   useEffect(() => {
  //     setSuggestions(allLocations);
  //   }, [`${allLocations}`]);

  // trying this to see if passes
  useEffect(() => {
    const locations = allLocations;
    setSuggestions(locations);
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
              <li
                data-testid={'suggestion'}
                onClick={handleItemClicked}
                key={suggestion}
              >
                {suggestion}
              </li>
            );
          })}
          <li
            data-testid={'suggestion'}
            key="See all cities"
            onClick={handleItemClicked}
          >
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}{' '}
    </div>
  );
};

export default CitySearch;

// chatGPT suggestions
// import React, { useState, useEffect } from 'react';

// const CitySearch = ({ allLocations, setCurrentCity }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const handleInputChanged = (event) => {
//     const value = event.target.value;
//     const filteredLocations = allLocations.filter((location) => {
//       return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//     });
//     setShowSuggestions(true);
//     setQuery(value);
//     setSuggestions(filteredLocations);
//   };

//   const handleItemClicked = (suggestion) => {
//     setQuery(suggestion);
//     setShowSuggestions(false);
//     setCurrentCity(suggestion);
//   };

//   useEffect(() => {
//     setSuggestions(allLocations);
//   }, [allLocations]);

//   return (
//     <div id="city-search" data-testid="city-search">
//       <input
//         data-testid="city-search-input"
//         type="text"
//         className="city"
//         placeholder="Search for a city"
//         value={query}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={() => setShowSuggestions(false)}
//         onChange={handleInputChanged}
//       />
//       {showSuggestions && query !== '' && (
//         <ul className="suggestions" data-testid="suggestions">
//           {suggestions.map((suggestion) => (
//             <li
//               data-testid="suggestion"
//               onClick={() => handleItemClicked(suggestion)}
//               key={suggestion}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CitySearch;
