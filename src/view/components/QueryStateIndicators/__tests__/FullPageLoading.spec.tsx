import React from 'react';
import { render, act, screen } from 'utils/test-utils';
import { QueryResult } from 'react-query';
import { FullPageLoading } from '../FullPageLoading';
import { WAIT_TIME_MS } from '../LoadingWithMinDisplay';

describe('<FullPageLoading />', () => {
  const baseQueryRes = {
    isLoading: true,
    error: undefined,
    data: [],
  } as QueryResult<any>;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

  const advanceTimersInAct = (advanceTimeMs: number) => {
    act(() => {
      jest.advanceTimersByTime(advanceTimeMs);
    });
  };

  it('renders an error indicator with a label', () => {
    const queryRes = { ...baseQueryRes, isLoading: false, error: true };
    const errorLabel = 'error';

    const { container } = render(
      <FullPageLoading queryRes={queryRes} errorLabel={errorLabel}>
        test
      </FullPageLoading>,
    );

    advanceTimersInAct(WAIT_TIME_MS + 1);

    expect(screen.getByTitle(errorLabel)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders a loading indicator with a label', () => {
    const loadingLabel = 'loading';

    const { container } = render(
      <FullPageLoading queryRes={baseQueryRes} loadingLabel={loadingLabel}>
        test
      </FullPageLoading>,
    );

    advanceTimersInAct(WAIT_TIME_MS + 1);

    expect(screen.getByText(loadingLabel)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
