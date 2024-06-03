// // trying CF GH code
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { getEvents } from '../api';
// import Event from '../components/Event';

// describe('<Event /> component', () => {
//   let EventComponent;
//   let allEvents;
//   beforeEach(async () => {
//     allEvents = await getEvents();
//     EventComponent = render(<Event event={allEvents[0]} />);
//   });

//   test('renders event Title', () => {
//     expect(
//       EventComponent.queryByText(allEvents[0].summary)
//     ).toBeInTheDocument();
//   });

//   test('renders event location', () => {
//     expect(
//       EventComponent.queryByText(allEvents[0].location)
//     ).toBeInTheDocument();
//   });

//   test('renders event details button with the title (show details)', () => {
//     expect(EventComponent.queryByText('show details')).toBeInTheDocument();
//   });

//   test("by default, event's details section should be hidden", () => {
//     expect(
//       EventComponent.container.querySelector('.details')
//     ).not.toBeInTheDocument();
//   });

//   test("shows the details section when the user clicks on the 'show details' button", async () => {
//     const user = userEvent.setup();
//     await user.click(EventComponent.queryByText('show details'));

//     expect(
//       EventComponent.container.querySelector('.details')
//     ).toBeInTheDocument();
//     expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
//     expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
//   });

//   test("hides the details section when the user clicks on the 'hide details' button", async () => {
//     const user = userEvent.setup();

//     await user.click(EventComponent.queryByText('show details'));
//     expect(
//       EventComponent.container.querySelector('.details')
//     ).toBeInTheDocument();
//     expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
//     expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();

//     await user.click(EventComponent.queryByText('hide details'));
//     expect(
//       EventComponent.container.querySelector('.details')
//     ).not.toBeInTheDocument();
//     expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
//     expect(EventComponent.queryByText('show details')).toBeInTheDocument();
//   });
// });

// my original code

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';
import Event from '../components/Event';

describe('<Event /> component', () => {
  const event = mockData[0];
  beforeEach(() => {
    render(<Event event={event} />);
  });

  // test Event component renders with title
  test('event title is shown', () => {
    console.log(event.summary);
    expect(screen.queryByText(event.summary)).toBeInTheDocument();
  });

  // test Event component renders with start time
  test('event start time is shown', () => {
    expect(screen.queryByText(event.start.dateTime)).toBeInTheDocument();
  });

  // test Event component renders with location
  test('event location is shown', () => {
    expect(screen.queryByText(event.location)).toBeInTheDocument();
  });

  // test Event component renders with show details button
  test('show details button is shown', () => {
    expect(screen.queryByText('Show Details')).toBeInTheDocument();
  });

  // test Event component renders with hide details button
  test('details are hidden by default', () => {
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });
});
