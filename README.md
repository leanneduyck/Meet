<p>This is an app where a user can search by city, define how many search results appear, receive a list of upcoming events in that city, show/hide full details of events, and view a chart with this data. A user will also be able to use this app to an extent offline, as well as add it to their home screen.</p>
<p>User Stories and Gherkin:</p>
<p>Feature 1: filter events by city.
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
When the user clicks the exit button, the user is returned to the full list of events.

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
</p>
<p>This app is built using CRA. To replicate, do the following:</p>
<ul>
  <li>1. In terminal, create new project: "npx create-react-app meet --template cra-template-pwa --use-npm"</li>
  <li>2. "cd meet" "npm run start"</li>
  <li>3. Via terminal, deploy to GH: "npm install --save-dev gh-pages"</li>
  <li>4. In GH, create new repository, then follow prompts to add existing repo via terminal.</li>
  <li>5. Add your homepage URL to package.json file (between "private" and "dependencies").</li>
  <li>6. In package.json, add to "scripts" section: "predeploy": "npm run build",
"deploy": "gh-pages -d build"</li>
  <li>7. Add remote URL, via terminal: "git init" , "git remote add origin https://github.com/leanneduyck/Meet.git"</li>
  <li>8. Commit and push changes, via terminal: "git add ." , "git commit -m "First commit" , "git branch -M main" , "git push -u origin main"</li>
  <li>9. Deploy, via terminal: "npm run deploy"</li>
</ul>
