import React, { FC } from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
} from '@material-ui/core';

export interface LoadingButtonProps {
  /**
   * Boolean value that will set the `endIcon` prop of the `<Button />`
   * to a `<CircularProgress />` element.
   */
  isLoading: boolean;
  /**
   * Props that will be applied to the `<CircularProgress />`
   * loading indicator
   */
  loadingIndicatorProps?: CircularProgressProps;
  /**
   * Props that will be applied to the `<Button />` element
   */
  buttonProps?: ButtonProps;
}

/**
 * `<Button />` element that can be used to indicate a loading state.
 * When the `isLoading` prop is `true`, a `<CircularProgress />` element
 * will be displayed to the right of the button label.
 */
export const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading,
  children: label,
  loadingIndicatorProps,
  buttonProps,
}) => {
  return (
    <Button
      endIcon={
        isLoading ? (
          <CircularProgress
            color={loadingIndicatorProps?.color || 'inherit'}
            {...loadingIndicatorProps}
          />
        ) : (
          buttonProps?.endIcon
        )
      }
      {...buttonProps}
    >
      {label}
    </Button>
  );
};
