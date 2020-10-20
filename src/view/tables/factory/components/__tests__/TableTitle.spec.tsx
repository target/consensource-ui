import React from 'react';
import { render } from 'utils/test-utils';
import { TableTitle } from '../TableTitle';

describe('<TableTitle />', () => {
  it('renders', () => {
    const { container } = render(<TableTitle />);
    expect(container).toMatchSnapshot();
  });
});
