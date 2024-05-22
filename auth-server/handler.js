// default, makes code more readable and maintainable
'use strict';

// import the googleapis library
const { google } = require('googleapis');
const calendar = google.calendar('v3');

// define the scopes for the OAuth2 client
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];

// best practice to store in config.json bc it's in .gitignore
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://leanneduyck.github.io/meet/'];

// create a new OAuth2 client, accepts client_id and client_secret, then redirect_uris
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// function to retrieve access token, refresh it, retry request for OAuth2 client
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};
