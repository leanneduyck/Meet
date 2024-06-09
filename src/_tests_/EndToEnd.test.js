import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;

  // open Chromium browser and navigate to the app before each test
  // headless mode is disabled so can see the app in action; currently commented out until last testing phase
  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch({
      //   headless: false,
      //   slowMo: 250, // slow down by 250ms,
      //   timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  // close Chromium browser after each test
  afterAll(async () => {
    await browser.close();
  });

  // feature 1a: when a user has not searched for any city, the user should see a list of upcoming events from all cities
  test('when a user has not searched for any city, the user should see a list of upcoming events from all cities', async () => {
    // check if there's a list of events displayed
    const events = await page.$$('.event');
    expect(events.length).toBeGreaterThan(0);
  });

  // feature 1b: when the main page is open, the user should see a list of suggestions when they search for a city
  test('when the main page is open, the user should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'New York');
    const suggestions = await page.waitForSelector('.suggestions li');
    expect(suggestions).toBeDefined();
  });

  // feature 1c: user can select a city from the suggested list
  test('user can select a city from the suggested list', async () => {
    await page.type('.city', 'New York');
    await page.waitForSelector('.suggestions li');
    await page.click('.suggestions li');
    const events = await page.$$('.event');
    expect(events.length).toBeGreaterThan(0);
  });

  // feature 2a: show/hide an event details
  test('An event element is collapsed by default', async () => {
    // check if event details are hidden
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  // feature 2b: user can expand an event to see its details
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    // check if event details are displayed
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  // feature 2c: user can collapse an event to hide its details
  test('User can collapse an event to hide details', async () => {
    // First expand the event to make sure it's expanded before we try to collapse it
    await page.click('.event .details-btn');
    let eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();

    // Now collapse the event
    await page.click('.event .details-btn');
    eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
