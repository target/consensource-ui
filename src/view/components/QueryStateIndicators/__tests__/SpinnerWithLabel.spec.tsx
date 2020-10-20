import React from 'react';
import { render } from 'utils/test-utils';
import { SpinnerWithLabel } from '../SpinnerWithLabel';

describe('<SpinnerWithLabel />', () => {
  it('renders', () => {
    const { container } = render(<SpinnerWithLabel>test</SpinnerWithLabel>);
    expect(container).toMatchSnapshot();
  });

  it('renders with a spinner size', () => {
    const { container } = render(
      <SpinnerWithLabel spinnerSize={100}>test</SpinnerWithLabel>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with a type variant', () => {
    const { container } = render(
      <SpinnerWithLabel typeVariant="h1">test</SpinnerWithLabel>,
    );
    expect(container).toMatchSnapshot();
  });
});
