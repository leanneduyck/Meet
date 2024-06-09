Feature: show and hide event details

Scenario: an event element is collapsed by default
    Given the user has specified a city
    When the user views that city’s list of upcoming events
    Then the full event details are hidden by default

Scenario: a user can expand an event to see details
    Given the user sees an interesting event
    When the user clicks or selects that event
    Then the full details are shown

Scenario: a user can collapse an event to hide details
    Given the user has finished viewing the event details
    When the user clicks the exit button
    Then the user is returned to the full list of events