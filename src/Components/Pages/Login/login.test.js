import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '.';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

describe('Login Screen Unit Test', () => {
  afterEach(cleanup);
  it('should render login text and welcome note and copyright', () => {
    render(<Login />, {wrapper: BrowserRouter});
    const LoginText = screen.getByTestId('Login');
    const WelcomeNote = screen.getByTestId('welcome-notes');
    const footerCopy = screen.getByTestId('copyright');
    expect(LoginText).toBeInTheDocument();
    expect(footerCopy).toBeInTheDocument();
    expect(WelcomeNote).toBeInTheDocument();
    expect(LoginText.textContent).toMatch('Login');
    expect(footerCopy.textContent).toContain('Weather');
  });
  it('should contain form inputs', () => {
    render(<Login />, {wrapper: BrowserRouter});
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const submit = screen.getByTestId('submit-button');
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
  it('should respond with an error when submit an empty form', async () => {
    render(<Login />, {wrapper: BrowserRouter});

    const submit = screen.getByTestId('submit-button');
    expect(submit).toBeInTheDocument();
    await act(() => Promise.resolve(fireEvent.submit(submit)));
    const error = screen.getByText(/Valid username is required/i);
    expect(error).toBeInTheDocument();
  });
  it('should accept valid inputs and login', async () => {
    jest.setTimeout(2000);
    render(<Login />, {wrapper: BrowserRouter});

    const submit = screen.getByTestId('submit-button');
    const user = screen.getByLabelText(/Username/i);
    const pass = screen.getByLabelText(/Password/i);
    await act(() => {
      Promise.resolve(userEvent.type(user, 'ipgautomotive'));
      Promise.resolve(userEvent.type(pass, 'carmaker'));
    });
    await act(() => Promise.resolve(fireEvent.click(submit)));

    const errorUser = screen.queryByText(/Valid username is required/i);
    expect(errorUser).toBe(null);

    const errorPass = screen.queryByText(/Valid password is required/i);
    expect(errorPass).toBe(null);
  });
  it('should render error toaster when invalid inputs passed', async () => {
    jest.setTimeout(2000);
    render(
      <>
        <Login /> <ToastContainer icon={false} />
      </>,
      {wrapper: BrowserRouter},
    );

    const submit = screen.getByTestId('submit-button');
    const user = screen.getByLabelText(/Username/i);
    const pass = screen.getByLabelText(/Password/i);
    await act(() => {
      Promise.resolve(userEvent.type(user, 'ipgautomotives'));
      Promise.resolve(userEvent.type(pass, 'carmakers'));
    });

    await act(() => Promise.resolve(fireEvent.click(submit)));
    expect(
      await screen.findByText('Invalid username or password'),
    ).toBeInTheDocument();
  });
});
