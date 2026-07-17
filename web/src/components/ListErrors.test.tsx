import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListErrors } from './ListErrors';

describe('ListErrors', () => {
  it('renders nothing when there are no errors', () => {
    const { container } = render(<ListErrors errors={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders "<field> <message>" for each error', () => {
    render(
      <ListErrors
        errors={{ email: ["can't be blank"], password: ['is too short'] }}
      />,
    );
    expect(screen.getByText(/email can't be blank/)).toBeInTheDocument();
    expect(screen.getByText(/password is too short/)).toBeInTheDocument();
  });
});
