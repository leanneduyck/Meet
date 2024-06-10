import { useEffect, useState, useCallback } from 'react';
// import { extractLocations, getEvents } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';
import spinningGlobe from './spinning_globe.gif';

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
          // URL taken from CF's Google Calendar API get HTTP Request
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
  // const accessToken = sessionStorage.getItem('access_token');
  const accessToken = sessionStorage.getItem('access_token');
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
    `https://coe3tj5b5f.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`
  );
  const { access_token } = await response.json();
  if (access_token) {
    sessionStorage.setItem('access_token', access_token);
    return access_token;
  } else {
    return null;
  }
};

// redirects the user to the Google OAuth URL
const redirectToAuthUrl = async () => {
  const response = await fetch(
    'https://coe3tj5b5f.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
  );
  const { authUrl } = await response.json();
  window.location.href = authUrl;
};

const App = () => {
  // state to store the list of events
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  // define fetchData using useCallback to memoize the function
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
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
    <div className="App" style={{ backgroundImage: `url(${spinningGlobe})` }}>
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
