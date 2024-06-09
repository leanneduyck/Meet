Feature: filter events by city

Scenario: when a user has not searched for any city, the user should see a list of upcoming events from all cities
    Given a user has not searched for any city
    When the user opens the app
    Then the user should see a list of upcoming events from all cities

Scenario: when the main page is open, the user should see a list of suggestions when they search for a city
    Given the main page is open
    When the user starts typing in the city textbox
    Then the user should see a list of suggestions when they search for a city

Scenario: when the user selects a city from the list, their city should be changed to that city and the user should receive a list of upcoming events in that city
    Given a user was typing “Berlin” in the city textbox and the list of suggested cities is showing
    When the user selects a city from the list
    Then their city should be changed to that city and the user should receive a list of upcoming events in that city

