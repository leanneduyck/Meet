// // trying CF GH code
// import CitySearch from './components/CitySearch';
// import EventList from './components/EventList';
// import NumberOfEvents from './components/NumberOfEvents';
// import { useEffect, useState } from 'react';
// import { extractLocations, getEvents } from './api';

// import './App.css';

// const App = () => {
//   const [allLocations, setAllLocations] = useState([]);
//   const [currentNOE, setCurrentNOE] = useState(32);
//   const [events, setEvents] = useState([]);
//   const [currentCity, setCurrentCity] = useState('See all cities');

//   useEffect(() => {
//     fetchData();
//   }, [currentCity]);

//   const fetchData = async () => {
//     const allEvents = await getEvents();
//     const filteredEvents =
//       currentCity === 'See all cities'
//         ? allEvents
//         : allEvents.filter((event) => event.location === currentCity);
//     setEvents(filteredEvents.slice(0, currentNOE));
//     setAllLocations(extractLocations(allEvents));
//   };

//   return (
//     <div className="App">
//       <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
//       <NumberOfEvents />
//       <EventList events={events} />
//     </div>
//   );
// };

// export default App;

// my original code

import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  // state to store the number of events to display
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState('See all cities');

  // fetches the list of all events when the app is mounted and rendered, is called whenever the current city changes
  // trying this without [currentCity] in useEffect due to failing test
  useEffect(() => {
    fetchData();
  }, []);

  // fetches the list of all events, filtered by the current city and number of events to display
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  // code from before going throuhg ex4.5
  // useEffect(() => {
  //   setEvents(mockData.slice(0, currentNOE));
  //   setLocations(extractLocations(mockData));
  // }, [currentNOE]);

  // maybe will add this to <NumberOfEvents /> component below
  // currentNOE={currentNOE} setCurrentNOE={setCurrentNOE}

  // returns the EventList component, the CitySearch component, and the Event component
  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />{' '}
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
};

export default App;
