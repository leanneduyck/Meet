Overview:
The Meet App allows users to search for events, customize search results, view event details, visualize data with charts, and use certain features offline. It fetches event data from CareerFoundry's Google Calendar API.

Key Features:

1. City Search: Users can search for events by city.
2. Customizable Results: Users can define the number of search results to display.
3. Event Details: Users can show or hide full details of each event.
4. Data Visualization: Users can view charts displaying event data.
5. Offline Functionality: Some features are accessible even without an internet connection.
6. Home Screen Shortcut: Users can add the app to their home screen for quick access.

Data Source:
The app retrieves event data from CareerFoundry's Google Calendar API.

Website: https://meet-puce-kappa.vercel.app/

User Stories and Gherkin:
Feature 1: filter events by city.
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.
Scenario 1: when a user hasn’t searched for any city, show upcoming events from all cities.
Given a user hasn’t searched for any city.
When the user opens the app.
Then the user should see a list of upcoming events.
Scenario 2: a user should see a list of suggestions when they search for a city.
Given the main page is open.
When the user starts typing in the city textbox.
Then the user should receive a list of cities/suggestions matching what they typed.
Scenario 3: a user can select a city from the suggested list.
Given a user was typing “Berlin” in the city textbox AND the list of suggested cities is showing.
When the user selects a city from the list.
Then their city should be changed to that city AND the user should receive a list of upcoming events in that city.

Feature 2: show/hide event details.
As a user,
I should be able to show/hide event details
So that I do not have to scroll as much past events I do not wish to know details.
Scenario 1: an event element is collapsed by default.
Given the user has specified a city.
When the user views that city’s list of upcoming events.
Then the full event details are hidden by default.
Scenario 2: a user can expand an event to see details.
Given the user sees an interesting event.
When the user clicks/selects that event.
Then the full details are shown.
Scenario 3: a user can collapse an event to hide details.
Given the user has finished viewing the event’s details.
When the user clicks the exit button,
Then the user is returned to the full list of events.

Feature 3: specify number of events.
As a user,
I should be able to specify the number of events
So that I do not have to scroll through more than I wish.
Scenario 1: when a user hasn’t specified a number, 32 events are shown by default.
Given the user has specified a certain city to search events AND the user has not specified a certain number of events to display.
When the user receives the list of events.
Then 32 events are shown by default.
Scenario 2: a user can change the number of events displayed.
Given the user has specified a certain city to search events AND the user has specified a certain number of events to be displayed in a prompt under the search bar.
When the user receives the list of events.
Then that number of events will be shown.

Feature 4: use the app when offline.
As a user,
I should be able to use the app when offline
So that I can search for events/details when I am out exploring the city.
Scenario 1: show cached data when there’s no internet connection.
Given the user has no internet connection.
When the user views cities/events previously viewed while the user had internet.
Then the user will see the cached data for these cities/events.
Scenario 2: show error when user changes search settings (city, number of events).
Given the user has no internet connection.
When the user tries to search a city or event previously not viewed while the user had internet.
Then the user will see an error message.

Feature 5: add an app shortcut to the home screen.
As a user,
I should be able to add an app shortcut to my home screen
So that I can more conveniently find and use the app.
Scenario 1: a user can install the meet app as a shortcut on their device home screen.
Given the user wishes to use this app easily (esp while traveling).
When the user downloads the app on his/her phone.
Then the user may select to have it displayed on his/her home screen.

Feature 6: display charts visualizing event details.
As a user,
I should be able to display charts visualizing event details
So that I can see how many events are coming up in which cities.
Scenario 1: show a chart with the number of upcoming events in each city.
Given the user has previously searched for cities and events.
When the user clicks/selects the chart button.
Then the user sees a chart displaying previously searched data (cities, number of events).

Technologies Used:

1. React: Built with Create React App (CRA) for building user interfaces.
2. Recharts: Used for data visualization with charts.
3. AWS Lambda: Utilized for processing real-time data, managing authentication, and scaling based on user demand.
4. Serverless Framework: Simplifies the deployment and management of AWS Lambda functions.
5. API Gateway: Manages API requests and routes them to the appropriate Lambda functions.
6. AWS Cognito: Manages user authentication and authorization.
7. Google OAuth 2.0: Handles user authentication via Google's OAuth service for secure access to the Google Calendar API.
8. Google Calendar API: Fetches event data, processed and displayed by the app.
9. React Hooks (useState, useEffect): Manage component state and side effects.
10. Service Workers: Enable the app to cache data and provide offline functionality.
11. Atatus SPA: Online performance monitoring tool for Single Page Applications.
12. JS-Cookie: For managing cookies.
13. Workbox: Set of libraries and node_modules to easily cache assets and used to easily build PWA’s.
14. Testing Libraries: jest-cucumber, puppeteer
15. Babel: JavaScript compiler.
16. Parcel: Bundler for packaging the application code.
17. React App Rewired: Allows customizing Create React App configuration without ejecting.
18. Webpack: Module bundler.
19. GitHub Pages: Deployed via Vercel.


Testing:

1. Jest: A JavaScript testing framework used for writing and running unit tests.
2. Puppeteer: Provides end-to-end testing capabilities, ensuring the app works as expected from the user’s perspective.
3. jest-cucumber: Integrates Cucumber-style testing with Jest for behavior-driven development (BDD).

Performance Monitoring:

1. Atatus: A performance monitoring tool used to track and optimize the app's performance and user experience.
   Why Serverless?
   The serverless architecture is particularly well-suited for the Meet App because:

Setup Instructions:
Creating the Project:

1. In terminal, create a new project: npx create-react-app meet --template cra-template-pwa --use-npm
2. Navigate to the project directory: cd meet
3. Start the development server: npm run start

Deploying to GitHub Pages:

1. Install the gh-pages package: npm install --save-dev gh-pages
2. Create a new repository on GitHub.
3. Add the repository to your project:
   Add the homepage URL to the package.json file.
   Add deployment scripts to the package.json file:
   "scripts": {
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   }
4. Initialize the Git repository and push to GitHub:
   git init
   git remote add origin https://github.com/your-username/meet.git
   git add .
   git commit -m "First commit"
   git branch -M main
   git push -u origin main
5. Deploy the app: 'npm run deploy'

Setting Up OAuth with Google:

1. Create a new project in the Google Developer Console.
2. Add the Google Calendar API.
3. Configure OAuth consent screen and add the required scope: https://www.googleapis.com/auth/calendar.events.public.readonly
4. Switch envirnoment from "in testing" to "in production" when ready for general users.

Setting Up AWS Lambda and Serverless Toolkit:

1. Install the Serverless framework: npm install -g serverless
2. Create a new Serverless service:
   serverless create --template aws-nodejs --path auth-server
   cd auth-server
   npm init
3. Configure AWS credentials:
   serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY (change keys to what Google OAuth gave)
4. Create config.json in the auth-server folder with your client ID and client secret from Google Calendar API.
5. Set up serverless.yml with provider and functions sections.
6. Install Google APIs package: npm install googleapis --save

Local Testing:

1. Test locally: serverless invoke local --function functionName
2. Copy received URL fromAndIncluding "https://" untilButExcluding "\", paste into google and see if it works!
3. Use the test user email set up in Google OAuth.

Deploying Functions:

1. Deploy functions: serverless deploy
2. Check that functions deployed correctly in AWS Management Console, deployed Lambda Functions.
3. OAuth2 Serverless Functions
   getAuthURL
   getAccessToken
   getCalendarEvents

Testing:

1. Set up local Node.js HTTP server: npm install http-server -g
2. Create a static site for testing serverless functions: mkdir static-test-site.
3. Test the static site by running: http-server.
4. Code for token code input is found in Meet app's URL after "code="

TDD and Acceptance Testing:

1. Write tests in App.test.js using Jest.
2. Run tests: npm run test
3. Check coverage: npm test -- --coverage
   goal is 70-100%
4. When beginning Acceptance Tests, run "npm run test" with defineFeature() block empty; error message provides needed code.

End-to-End Testing:

1. Install Puppeteer: npm install --save-dev puppeteer
2. Start the local app: npm run start
3. Run tests: npm run test

App Performance Monitoring:

1. Set up an Atatus account and follow installation prompts.

PWA/Recharts:

1. Evaluate PWA readiness using Lighthouse in Chrome DevTools.
2. Adjust manifest.json, index.js, service-worker.js, and serviceWorkerRegistration.js as needed.
3. Install Recharts: npm install --save recharts

Deploying to Vercel:
1.Install Vercel CLI: If not already installed, install the Vercel CLI globally:
npm install -g vercel 
2. Build the App: Ensure your app is built and ready for deployment:
npm run build 
3. Deploy to Vercel: Deploy the app using Vercel CLI. Navigate to your project directory and run:
vercel 
4. Follow Deployment Prompts: Vercel CLI will prompt you to log in or sign up if you haven't already. Follow the prompts to deploy the app. 
5. Configure Deployment Settings: Configure your deployment settings as prompted by Vercel, including project name, environment variables, and domain settings. 
6. Access Your App: Once deployed, Vercel will provide you with a URL where your Meet App is live.
