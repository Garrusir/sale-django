/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import 'whatwg-fetch';

import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/скидки и акции/i);
  expect(linkElement).toBeInTheDocument();
});

test('navbar is working', () => {
  render(<App />)

  userEvent.click(screen.getByText(/каталог/i));
  expect(global.window?.location?.pathname).toEqual('/catalog');
});

test('login is working', () => {
  render(<App />)

  userEvent.click(screen.getByText(/вход/i));
  userEvent.paste(screen.getByTestId('email'), 'member');
  userEvent.paste(screen.getByTestId('password'), '7Kb8.vbjC_*u8LZ');
  userEvent.click(screen.getByText(/Продолжить/i));
  waitForElementToBeRemoved(screen.getByTestId('email')).then(() => {
    expect(global.window?.location?.pathname).toEqual('/');
    expect(screen.getByText(/Профиль/i)).toBeInTheDocument();
  });
});
