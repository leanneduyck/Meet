import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  // state to store the list of events
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // kept failing without above line
  }, [currentCity, currentNOE]);

  // fetches the list of all events when the app is mounted and rendered, is called whenever the current city changes, and is called whenever the current number of events to display changes
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  //returns the CitySearch, NOE, and EventList components
  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />{' '}
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
};

export default App;

//
// original code
// import { useEffect, useState } from 'react';
// import { extractLocations, getEvents } from './api';
// import CitySearch from './components/CitySearch';
// import EventList from './components/EventList';
// import NumberOfEvents from './components/NumberOfEvents';

// import './App.css';

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [allLocations, setAllLocations] = useState([]);
//   // state to store the number of events to display
//   const [currentNOE, setCurrentNOE] = useState(32);
//   const [currentCity, setCurrentCity] = useState('See all cities');

//   // fetches the list of all events when the app is mounted and rendered, is called whenever the current city changes, and is called whenever the current number of events to display changes
//   useEffect(() => {
//     fetchData();
//   }, [currentCity, currentNOE]);

//   // fetches the list of all events, filtered by the current city and number of events to display
//   const fetchData = async () => {
//     const allEvents = await getEvents();
//     const filteredEvents =
//       currentCity === 'See all cities'
//         ? allEvents
//         : allEvents.filter((event) => event.location === currentCity);
//     setEvents(filteredEvents.slice(0, currentNOE));
//     setAllLocations(extractLocations(allEvents));
//   };

//   // returns the EventList component, the CitySearch component, and the Event component
//   return (
//     <div className="App">
//       <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />{' '}
//       <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
//       <EventList events={events} />
//     </div>
//   );
// };

// export default App;
