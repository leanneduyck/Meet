import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  // test that the EventList component renders correctly
  test('has an element with "list" role', () => {
    render(<EventList />);
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  // test that the EventList component renders correctly
  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(
      allEvents.length
    );
  });
});
