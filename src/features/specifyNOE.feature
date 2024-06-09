Feature: specify number of events

Scenario: when a user has not specified a number, 32 events are shown by default
    Given the user has specified a certain city to search events and the user has not specified a certain number of events to display
    When the user receives the list of events
    Then 32 events are shown by default

Scenario: a user can change the number of events displayed
    Given the user has specified a certain city to search events and the user has specified a certain number of events to be displayed in a prompt under the search bar
    When the user receives the list of events
    Then that number of events will be shown