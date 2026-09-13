import { render, screen } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';

test('renders inventory table controls', async () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );

  const addButton = await screen.findByRole('button', { name: /add new row/i });
  expect(addButton).toBeInTheDocument();
});
