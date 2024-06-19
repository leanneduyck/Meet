// passes all but App.test.js - probably bc of endpoint URLs not being correct???
import mockData from './mock-data';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Optionally import the CSS for NProgress

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
    if (!navigator.onLine) {
      const events = localStorage.getItem('lastEvents');
      NProgress.done();
      return events ? JSON.parse(events) : [];
    }
    const accessToken = await getAccessToken();
    if (accessToken) {
      const url =
        // URL taken from Google Calendar API get HTTP Request
        'https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId' +
        '/' +
        accessToken;
      // adjusted to work offline as part of PWA
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        NProgress.done();
        localStorage.setItem('lastEvents', JSON.stringify(result.events));
        return result.events;
      } else return null;
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
    'https://www.meet-puce-kappa.vercel.app{get-auth-url}'
  );
  const { authUrl } = await response.json();
  window.location.href = authUrl;
};
