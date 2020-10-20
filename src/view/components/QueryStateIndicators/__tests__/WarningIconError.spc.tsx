import React from 'react';
import { render } from 'utils/test-utils';
import { WarningIconError } from '../WarningIconError';

describe('<WarningIconError />', () => {
  it('renders', () => {
    const { container } = render(<WarningIconError>test</WarningIconError>);
    expect(container).toMatchSnapshot();
  });

  it('renders with a size', () => {
    const { container } = render(
      <WarningIconError size="small">test</WarningIconError>,
    );
    expect(container).toMatchSnapshot();
  });
});
