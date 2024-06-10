// default, makes code more readable and maintainable
// 'use strict';

// import the googleapis library
const { google } = require('googleapis');
const calendar = google.calendar('v3');

// define the scopes for the OAuth2 client
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];

// best practice to store in config.json bc it's in .gitignore
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://meet-puce-kappa.vercel.app'];

// create a new OAuth2 client, accepts client_id and client_secret, then redirect_uris
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// getAuthURL function to retrieve access token, refresh it, retry request for OAuth2 client
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  // generate the URL for the OAuth2 client
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      // allow CORS, all origins
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// getAccessToken function to get the access token and set it to the OAuth2 client
module.exports.getAccessToken = async (event) => {
  // decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  // const code = decodeURIComponent(event.body.code);
  // const code = event.body.code;
  console.log('code:', code);

  return new Promise((resolve, reject) => {
    // exchange authorization code for access token
    // callback function with error and response parameters
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          // allow CORS, all origins
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // error handling
      return {
        statusCode: 500,
        body: JSON.stringify(error),
        headers: {
          // allow CORS, all origins
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
    });
};

// getCalendarEvents function to get the calendar events
module.exports.getCalendarEvents = async (event) => {
  // get the access token from the request
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );
  // set the credentials for the OAuth2 client
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    // get the calendar events
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      }
    );
  })
    .then((results) => {
      // respond with the calendar events
      return {
        statusCode: 200,
        headers: {
          // allow CORS, all origins
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results.data),
      };
    })
    .catch((error) => {
      // error handling
      return {
        statusCode: 500,
        body: JSON.stringify(error),
        headers: {
          // allow CORS, all origins
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
    });
};
