import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  let EventListComponent;
  // render the EventList component before each test
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  // test that the EventList component renders correctly
  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  // test that the EventList component renders correctly
  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(
      allEvents.length
    );
  });
});
