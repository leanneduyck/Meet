// my original code

// import mockData from './mock-data';

// /**
//  *
//  * @param {*} events:
//  * The following function should be in the “api.js” file.
//  * This function takes an events array, then uses map to create a new array with only locations.
//  * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//  * The Set will remove all duplicates from the array.
//  */
// export const extractLocations = (events) => {
//   const extractedLocations = events.map((event) => event.location);
//   const locations = [...new Set(extractedLocations)];
//   return locations;
// };

// // gets the token from Google OAuth
// const checkToken = async (accessToken) => {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
//   );
//   const result = await response.json();
//   return result;
// };

// // gets events from the mockData file if the app is running locally, otherwise it will fetch the events from the Google Calendar API
// export const getEvents = async () => {
// if (window.location.href.startsWith('http://localhost')) {
//   return mockData;
// }};

//  const token = await getAccessToken();

//  // gets the token from Google OAuth
//  const getToken = async (code) => {
//   const encodeCode = encodeURIComponent(code);
//   const response = await fetch(
//     // use actual Lambda getAccessToken endpoint...I don't know where to find this...
//     'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
//   );
//   const { access_token } = await response.json();
//   access_token && localStorage.setItem("access_token", access_token);

//   return access_token;
// };

//  // sets up removeQuery function
//  const removeQuery = () => {
//   let newurl;
//   if (window.history.pushState && window.location.pathname) {
//     newurl =
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname;
//     window.history.pushState("", "", newurl);
//   } else {
//     newurl = window.location.protocol + "//" + window.location.host;
//     window.history.pushState("", "", newurl);
//   }
// };

//   if (token) {
//     // removes the query from the URL once the token is received
//     removeQuery();
//     // fetches the events from the Google Calendar API, not sure what the actual endpoint is
//     const url =  "YOUR_GET_EVENTS_API_ENDPOINT" + "/" + token;
//     const response = await fetch(url);
//     const result = await response.json();
//     // if the result is not null, the function will return the events
//     if (result) {
//       return result.events;
//       // if the result is null, the function will return null
//     } else return null;
//   }
// };

// // gets accessToken from Google OAuth
// export const getAccessToken = async () => {
//     // checks if the access token is in the local storage
//     const accessToken = localStorage.getItem('access_token');
//       const tokenCheck = accessToken && (await checkToken(accessToken));

//       // if there is no access token or the token is invalid, the function will redirect the user to the Google OAuth URL
//       if (!accessToken || tokenCheck.error) {
//         await localStorage.removeItem('access_token');
//         const searchParams = new URLSearchParams(window.location.search);
//         const code = await searchParams.get('code');
//         // if there is no code, the function will redirect the user to the Google OAuth URL
//         if (!code) {
//             // use actual Lambda getAuthURL endpoint...I don't know where to find this...
//           const response = await fetch('YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT');
//           const result = await response.json();
//           const { authUrl } = result;
//           return (window.location.href = authUrl);
//         }
//         // if there is a code, the function will call the getToken function
//         return code && getToken(code);
//       }
//       // if the access token is valid, the function will return the access token
//       return accessToken;
// };

// chatGPT suggestions
import mockData from './mock-data';

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }
  return null; // Default return value
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    // Use actual Lambda getAccessToken endpoint...
    'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem('access_token', access_token);
  return access_token;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      // Use actual Lambda getAuthURL endpoint...
      const response = await fetch('YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT');
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
