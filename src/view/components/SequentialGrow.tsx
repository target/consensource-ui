import React, { ReactElement } from 'react';
import { Grow, GrowProps } from '@material-ui/core';

export interface SequentialGrowProps<T> extends GrowProps {
  items: T[];
  renderItem: (element: T) => ReactElement;
  /**
   * Number of milliseconds to wait before displaying the first item
   */
  timeoutMs?: number;
  /**
   * Number of milliseconds to wait before displaying each subsequent
   * item in the array
   */
  timeoutIntervalMs?: number;
}

/**
 * Takes an array of items and uses the MUI Grow transition
 * to sequentially display each item. The first item is displayed
 * after `timeoutMs` milliseconds, and each item afterwards is displayed
 * after (timeoutMs + timeoutIntervalMs * i) milliseconds.
 */
export const SequentialGrow = <T extends {}>({
  items,
  renderItem,
  timeoutMs = 1000,
  timeoutIntervalMs = 250,
  ...otherProps
}: SequentialGrowProps<T>): any => {
  return items.map((item, i) => (
    <Grow in timeout={timeoutMs + timeoutIntervalMs * i} {...otherProps}>
      {renderItem(item)}
    </Grow>
  ));
};
