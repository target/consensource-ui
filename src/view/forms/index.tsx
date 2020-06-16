/**
 * Helper function that checks if any values in `state` have not been set.
 * Returns true if there is any key in `state` that is falsey.
 */
export function hasEmptyFields<T>(state: T) {
  return Object.keys(state).some((key) => !state[key as keyof T]);
}

export interface FormProps {
  onSubmit: Function;
  onSubmitBtnLabel?: string;
}
