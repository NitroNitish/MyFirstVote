import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Confetti } from './Confetti';

describe('Confetti Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Confetti count={10} />);
    expect(container).toBeDefined();
    // It should render a container and spans
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(10);
  });

  it('renders with default count', () => {
    const { container } = render(<Confetti />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(80);
  });
});
