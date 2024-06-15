import { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    if (filteredLocations.length === 0) {
      setInfoAlert(
        'We can not find the city you are looking for. Please try another city'
      );
    } else {
      setInfoAlert('');
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert('');
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;

// import { useState, useEffect } from 'react';

// const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
//   // state to show or hide suggestions, store the user input, and store the list of suggestions
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   // keep getting errors with [`${allLocations}`] so trying below code
//   //   useEffect(() => {
//   //     setSuggestions(allLocations);
//   //   }, [`${allLocations}`]);

//   // this passes
//   useEffect(() => {
//     setSuggestions(allLocations);
//   }, [allLocations]);

//   // function to handle changes to the text input field
//   const handleInputChanged = (event) => {
//     const value = event.target.value;
//     const filteredLocations = allLocations
//       ? allLocations.filter((location) => {
//           return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//         })
//       : [];

//     setQuery(value);
//     setSuggestions(filteredLocations);

//     // sets infoAlert if no suggestions are found
//     let infoText;
//     if (filteredLocations.length === 0) {
//       infoText =
//         'We can not find the city you are looking for. Please try another city';
//     } else {
//       infoText = '';
//     }
//     setInfoAlert(infoText);
//   };

//   // function to handle when a user clicks on a suggestion, which sets the query to the suggestion and hides the list
//   // stops infoAlert from showing when 'see all cities' is clicked
//   const handleItemClicked = (event) => {
//     const value = event.target.textContent;
//     setQuery(value);
//     setShowSuggestions(false);
//     setCurrentCity(value);
//     setInfoAlert('');
//   };

//   return (
//     // returns a text input field and a list of suggestions, which are hidden by default, and appear when the text input field gains focus
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

// //
// my original code
// import { useState, useEffect } from 'react';

// const CitySearch = ({ allLocations, setCurrentCity }) => {
//   // state to show or hide suggestions, store the user input, and store the list of suggestions
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   // function to handle changes to the text input field
//   const handleInputChanged = (event) => {
//     const value = event.target.value;
//     const filteredLocations = allLocations
//       ? allLocations.filter((location) => {
//           return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//         })
//       : [];
//     setShowSuggestions(true);
//     setQuery(value);
//     setSuggestions(filteredLocations);
//   };

//   // function to handle when a user clicks on a suggestion, which sets the query to the suggestion and hides the list
//   const handleItemClicked = (event) => {
//     const value = event.target.textContent;
//     setQuery(value);
//     setShowSuggestions(false);
//     setCurrentCity(value);
//   };

//   // uses stringified value of allLocations to update the list of suggestions when allLocations changes
//   // keeps failing, trying below code
//   //   useEffect(() => {
//   //     setSuggestions(allLocations);
//   //   }, [`${allLocations}`]);

//   // trying this to see if passes
//   useEffect(() => {
//     const locations = allLocations;
//     setSuggestions(locations);
//   }, [allLocations]);

//   // returns a text input field and a list of suggestions, which are hidden by default, and appear when the text input field gains focus
//   // and are updated as the user types in the text input field, and a list item to see all cities
//   return (
//     <div id="city-search" data-testid="city-search">
//       <input
//         data-testid="city-search-input"
//         type="text"
//         className="city"
//         placeholder="Search for a city"
//         value={query}
//         onFocus={() => setShowSuggestions(true)}
//         onChange={handleInputChanged}
//       />
//       {showSuggestions ? (
//         <ul className="suggestions" data-testid="suggestions">
//           {suggestions.map((suggestion) => {
//             return (
//               <li
//                 data-testid={'suggestion'}
//                 onClick={handleItemClicked}
//                 key={suggestion}
//               >
//                 {suggestion}
//               </li>
//             );
//           })}
//           <li
//             data-testid={'suggestion'}
//             key="See all cities"
//             onClick={handleItemClicked}
//           >
//             <b>See all cities</b>
//           </li>
//         </ul>
//       ) : null}{' '}
//     </div>
//   );
// };

// export default CitySearch;
