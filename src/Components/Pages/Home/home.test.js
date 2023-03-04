import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';

describe('Home Screen Unit Test', () => {
  afterEach(cleanup);
  const mockData = {
    location: {
      name: 'London',
    },
  };
  it('should render Home Page and expect empty list', () => {
    render(<Home />, {wrapper: BrowserRouter});
    const homePage = screen.getByTestId('Home_Page');
    const noitem = screen.getByText(/Add items to your list/i);
    expect(noitem).toBeInTheDocument();
    expect(homePage).toBeInTheDocument();
  });
  it('should render List to the screen', () => {
    render(<Home listItem={[mockData]} />, {wrapper: BrowserRouter});
    const londonText = screen.getByText(/London/i);
    expect(londonText).toBeInTheDocument();
  });
  it('should delete item to the screen', async () => {
    render(<Home listItem={[mockData]} />, {wrapper: BrowserRouter});
    const icon = screen.getByTestId('delete');
    await act(() => Promise.resolve(fireEvent.click(icon)));
    const londonText = screen.queryByText(/London/i);
    expect(londonText).toBe(null);
  });
  it('should input and  add location', async () => {
    render(<Home />, {wrapper: BrowserRouter});
    const submit = screen.getByTestId('submit-button');
    const location = screen.getByLabelText(/Location/i);
    await act(() => {
      Promise.resolve(userEvent.type(location, 'London'));
    });
    await act(() => Promise.resolve(fireEvent.click(submit)));
    expect(await screen.findByText('London')).toBeInTheDocument();
  });
  it('should check if searchvalue is not empty', async () => {
    render(<Home searchValue='Damaturu' />, {wrapper: BrowserRouter});
    const submit = screen.getByTestId('submit-button');

    await act(() => Promise.resolve(fireEvent.click(submit)));
    expect(await screen.findByText('Damaturu')).toBeInTheDocument();
  });
  it('should display error if invalid city pass', async () => {
    render(
      <>
        <Home /> <ToastContainer icon={false} />
      </>,
      {wrapper: BrowserRouter},
    );
    const submit = screen.getByTestId('submit-button');
    const location = screen.getByLabelText(/Location/i);
    await act(() => {
      Promise.resolve(userEvent.type(location, 'licester'));
    });
    await act(() => Promise.resolve(fireEvent.click(submit)));
    expect(
      await screen.findByText('Please enter a valid city name'),
    ).toBeInTheDocument();
  });
  it('should display error if limit exceeds', async () => {
    const mockFiveData = [
      {
        location: {
          name: 'London',
        },
      },
      {
        location: {
          name: 'Birmingham',
        },
      },
      {
        location: {
          name: 'Yobe',
        },
      },
      {
        location: {
          name: 'Damaturu',
        },
      },
      {
        location: {
          name: 'Toronto',
        },
      },
    ];
    render(
      <>
        <Home listItem={mockFiveData} /> <ToastContainer icon={false} />
      </>,
      {wrapper: BrowserRouter},
    );
    const submit = screen.getByTestId('submit-button');
    const location = screen.getByLabelText(/Location/i);
    await act(() => {
      Promise.resolve(userEvent.type(location, 'licester'));
    });
    await act(() => Promise.resolve(fireEvent.click(submit)));
    expect(
      await screen.findByText('Maximum of 5 cities allowed'),
    ).toBeInTheDocument();
  });
});
