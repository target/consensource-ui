import React from 'react';
import { render } from 'utils/testing';
import { TableTitle } from '../TableTitle';

describe('<TableTitle />', () => {
  it('renders', () => {
    const { container } = render(<TableTitle />);
    expect(container).toMatchSnapshot();
  });
});
