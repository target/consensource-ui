import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { QueryResult } from 'react-query';
import {
  LoadingWithMinDisplay,
  WAIT_TIME_MS,
  MIN_DISPLAY_TIME_MS,
} from '../LoadingWithMinDisplay';

describe('<LoadingWithMinDisplay />', () => {
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

  describe('returns null', () => {
    let view: any;

    beforeEach(() => {
      const {
        container: { firstChild },
      } = render(
        <LoadingWithMinDisplay queryRes={baseQueryRes}>
          test
        </LoadingWithMinDisplay>,
      );

      view = firstChild;
    });

    it('on first render', () => {
      expect(view).toBe(null);
    });

    it('while the wait timer is active', () => {
      advanceTimersInAct(WAIT_TIME_MS - 1);
      expect(view).toBe(null);
    });
  });

  describe('returns a loading indicator', () => {
    const loadingTestId = 'loading-indicator';
    const loadingIndicatorElem = <div data-testid={loadingTestId} />;

    beforeEach(() => {
      render(
        <LoadingWithMinDisplay
          queryRes={baseQueryRes}
          loadingIndicator={loadingIndicatorElem}
        >
          test
        </LoadingWithMinDisplay>,
      );
    });

    it('renders a default loading indicator', () => {
      const { container } = render(
        <LoadingWithMinDisplay queryRes={baseQueryRes}>
          test
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(container).toMatchSnapshot();
    });

    it('if the display timer is active', async () => {
      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(screen.getByTestId(loadingTestId)).toBeInTheDocument();
    });

    it('waits at least waitTimeMs to display the loading indicator', () => {
      advanceTimersInAct(WAIT_TIME_MS - 1);
      expect(screen.queryByTestId(loadingTestId)).toBe(null);
    });
  });

  describe('returns an error indicator', () => {
    const errorTestId = 'error-indicator';
    const errorIndicatorElem = <div data-testid={errorTestId} />;

    it('renders a default error indicator', () => {
      const queryRes = { ...baseQueryRes, isLoading: false, error: true };

      const { container } = render(
        <LoadingWithMinDisplay queryRes={queryRes}>test</LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(container).toMatchSnapshot();
    });

    it('if the query res returned an error', async () => {
      const queryRes = { ...baseQueryRes, isLoading: false, error: true };

      render(
        <LoadingWithMinDisplay
          queryRes={queryRes}
          errorIndicator={errorIndicatorElem}
        >
          test
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(screen.getByTestId(errorTestId)).toBeInTheDocument();
    });

    it('if the query res returned a falsey value', async () => {
      const queryRes = { ...baseQueryRes, isLoading: false, data: undefined };

      render(
        <LoadingWithMinDisplay
          queryRes={queryRes}
          errorIndicator={errorIndicatorElem}
        >
          test
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(screen.getByTestId(errorTestId)).toBeInTheDocument();
    });
  });

  describe('returns children', () => {
    const childTestId = 'child';
    const childComponent = <div data-testid={childTestId} />;

    it('invokes the children function with query data', async () => {
      const mockFn = jest.fn(() => childComponent);

      render(
        <LoadingWithMinDisplay queryRes={{ ...baseQueryRes, isLoading: false }}>
          {mockFn}
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + MIN_DISPLAY_TIME_MS + 1);

      expect(mockFn).toHaveBeenCalledWith(baseQueryRes.data);
      expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    });

    it('returns the children react node', async () => {
      render(
        <LoadingWithMinDisplay queryRes={{ ...baseQueryRes, isLoading: false }}>
          {childComponent}
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + MIN_DISPLAY_TIME_MS + 1);
      expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    });

    it('does not render the loading indicator if loading completes before the wait time is over', async () => {
      const { rerender } = render(
        <LoadingWithMinDisplay queryRes={baseQueryRes}>
          {childComponent}
        </LoadingWithMinDisplay>,
      );

      rerender(
        <LoadingWithMinDisplay queryRes={{ ...baseQueryRes, isLoading: false }}>
          {childComponent}
        </LoadingWithMinDisplay>,
      );

      advanceTimersInAct(WAIT_TIME_MS + 1);
      expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    });
  });
});
