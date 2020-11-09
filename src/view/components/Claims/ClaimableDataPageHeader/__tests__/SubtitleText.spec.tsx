import React from 'react';
import { render, screen } from 'utils/testing';
import { SubtitleText } from '../SubtitleText';

describe('<SubtitleText />', () => {
  it('renders', () => {
    const text = 'Test';

    const { container } = render(<SubtitleText>{text}</SubtitleText>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
