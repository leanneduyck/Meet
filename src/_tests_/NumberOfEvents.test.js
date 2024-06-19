import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

// define mockUpdateEvents outside of 'describe' as per chatGPT suggestion
const mockUpdateEvents = jest.fn();

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  // adding updateEvents={mockUpdateEvents} as per chatGPT suggestion
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents
        updateEvents={mockUpdateEvents}
        setErrorAlert={() => {}}
      />
    );
  });

  // test that NumberOfEvents text input renders correctly
  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  // test that default value of NumberOfEvents text input is 32
  test('default number is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue('32');
  });

  // test that NumberOfEvents text input value changes when user types in the input
  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, '123');

    // After typing '123', the value should be '32123' (default value + typed value)
    expect(numberTextBox).toHaveValue('32123');
  });
});
