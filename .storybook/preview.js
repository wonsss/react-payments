import CardContext from 'store/card/CardContext';
import { MemoryRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <MemoryRouter>
        <CardContext>{Story()}</CardContext>
      </MemoryRouter>
    );
  },
];
