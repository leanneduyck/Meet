import { useEffect, useState, useCallback } from 'react';
// import { extractLocations, getEvents } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';

import mockData from './mock-data';

// extracts the locations from the events
const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// gets events from the mockData file if the app is running locally, otherwise it will fetch the events from the Google Calendar API
const getEvents = async () => {
  // return [];
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  } else {
    const accessToken = await getAccessToken();
    console.log({ accessToken });
    if (accessToken) {
      try {
        const url =
          // URL taken from Google Calendar API get HTTP Request; is this correct?
          // added this URL to serverless.yml
          'https://coe3tj5b5f.execute-api.us-east-1.amazonaws.com/dev/api/get-events' +
          '/' +
          accessToken;
        const response = await fetch(url);
        const result = await response.json();
        return result?.events || result?.items || [];
      } catch (err) {
        console.error('ERROR:', err);
        return [];
      }
    } else {
      return [];
    }
  }
};

// gets the token from Google OAuth
const getAccessToken = async () => {
  // checks if the access token is in the local storage
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    return accessToken;
  } else {
    // redirects the user to the Google OAuth URL
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      return getToken(code);
    } else {
      redirectToAuthUrl();
    }
  }
};

// gets the token from Google OAuth using the provided code
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    // URL taken from CF Ex 4.5 code check; is this correct?
    `https://coe3tj5b5f.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`
  );
  const { access_token } = await response.json();
  if (access_token) {
    localStorage.setItem('access_token', access_token);
    return access_token;
  } else {
    return null;
  }
};

// redirects the user to the Google OAuth URL
const redirectToAuthUrl = async () => {
  const response = await fetch(
    // URL made up from Google API "Authorized Redirect URIs" + path from serverless.yml...is this correct?
    // added this URL to serverless.yml
    'https://coe3tj5b5f.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
  );
  const { authUrl } = await response.json();
  window.location.href = authUrl;
};

const App = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // state to store the list of events
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  const fetchEvents = async () => {
    const currentEvents = await getEvents();
    setAllEvents(currentEvents);
  };

  // Define fetchData using useCallback to memoize the function
  const fetchData = useCallback(async () => {
    let currentEvents = allEvents;
    // if (currentEvents?.length === 0) {
    //   const currentEvents = await getEvents();
    //   setAllEvents(currentEvents);
    // }

    const filteredEvents =
      currentCity === 'See all cities'
        ? currentEvents
        : currentEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(currentEvents));
  }, [currentCity, currentNOE, allEvents]);

  useEffect(() => {
    if (isLoaded === false) {
      fetchEvents();
      setIsLoaded(true);
    }

    fetchData();
  }, [fetchData]);

  // handler function to update the current number of events
  const handleCurrentNOEChange = (newNOE) => {
    setCurrentNOE(newNOE);
  };

  // handler function to update the current city
  const handleCurrentCityChange = (newCity) => {
    setCurrentCity(newCity);
  };

  // returns the CitySearch, NOE, and EventList components
  return (
    <div className="App">
      {/* CitySearch component */}
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={handleCurrentCityChange}
      />

      {/* NumberOfEvents component */}
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={handleCurrentNOEChange}
        updateEvents={(count) => {
          setCurrentNOE(count);
        }}
      />

      {/* EventList component */}
      <EventList events={events} />
    </div>
  );
};

export default App;

// trying above code
// import CitySearch from './components/CitySearch';
// import EventList from './components/EventList';
// import NumberOfEvents from './components/NumberOfEvents';
// import { useEffect, useState } from 'react';
// import { extractLocations, getEvents } from './api';

// import './App.css';

// const App = () => {
//   // state to store the list of events
//   const [allLocations, setAllLocations] = useState([]);
//   const [currentNOE, setCurrentNOE] = useState(32);
//   const [events, setEvents] = useState([]);
//   const [currentCity, setCurrentCity] = useState('See all cities');

//   // fetches the list of all events when the app is mounted and rendered, is called whenever the current city changes, and is called whenever the current number of events to display changes
//   const fetchData = async () => {
//     const allEvents = await getEvents();
//     const filteredEvents =
//       currentCity === 'See all cities'
//         ? allEvents
//         : allEvents.filter((event) => event.location === currentCity);
//     setEvents(filteredEvents.slice(0, currentNOE));
//     setAllLocations(extractLocations(allEvents));
//   }, [currentCity, currentNOE]);

//     useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // kept failing without above line
//   }, [fetchData]);

//   //returns the CitySearch, NOE, and EventList components
//   return (
//     <div className="App">
//       <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />{' '}
//       <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
//       <EventList events={events} />
//     </div>
//   );
// };

// export default App;

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
