// passes all but App.test.js - probably bc of endpoint URLs not being correct???
import mockData from './mock-data';

// extracts the locations from the events
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// gets events from the mockData file if the app is running locally, otherwise it will fetch the events from the CF's Google Calendar API
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  } else {
    const accessToken = await getAccessToken();
    if (accessToken) {
      const url =
        // URL taken from Google Calendar API get HTTP Request
        'https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId' +
        '/' +
        accessToken;
      const response = await fetch(url);
      const result = await response.json();
      return result.events || null;
    } else {
      return null;
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
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${encodeCode}`
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
    'https://leanneduyck.github.io/meet/{get-auth-url}'
  );
  const { authUrl } = await response.json();
  window.location.href = authUrl;
};
