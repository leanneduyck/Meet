import { useEffect, useState, useCallback } from 'react';
// import { setCookie, getCookie } from './cookieUtils';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

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
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  } else {
    const accessToken = await getAccessToken();
    if (accessToken) {
      try {
        const url =
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

// gets the token from local storage or redirects the user to the Google OAuth URL
const getAccessToken = async () => {
  const accessToken = sessionStorage.getItem('access_token');
  if (accessToken) {
    return accessToken;
  } else {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      return getToken(code);
    } else {
      redirectToAuthUrl();
    }
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

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
    setLoading(false);
  }, [currentCity, currentNOE]);

  useEffect(() => {
    if (navigator.onLine) {
      // if online, set the error alert message to an empty string
      setWarningAlert('');
      // if offline, warningAlert message will be displayed
    } else {
      setWarningAlert(
        'Some features may not work as expected when being used offline.'
      );
    }
    fetchData();
  }, [fetchData]);

  const handleCurrentNOEChange = (newNOE) => {
    setCurrentNOE(newNOE);
    fetchData();
  };

  const handleCurrentCityChange = (newCity) => {
    setCurrentCity(newCity);
    fetchData();
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${spinningGlobe})` }}>
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
      </div>

      <h1>Meet App</h1>
      <button className="force-login" onClick={redirectToAuthUrl}>
        Force Login
      </button>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={handleCurrentCityChange}
        setInfoAlert={setInfoAlert}
        setWarningAlert={setWarningAlert}
      />
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={handleCurrentNOEChange}
        updateEvents={(count) => setCurrentNOE(count)}
        setErrorAlert={setErrorAlert}
      />
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="charts-container">
          {events.length > 0 && <EventGenresChart events={events} />}
          {allLocations.length > 0 && events.length > 0 && (
            <CityEventsChart allLocations={allLocations} events={events} />
          )}
        </div>
      )}
      <EventList events={events} />
    </div>
  );
};

export default App;
