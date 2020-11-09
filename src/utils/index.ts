export function getLocaleFromUnix(timestampSeconds: number) {
  const timestampMs = timestampSeconds * 1000;
  return new Date(timestampMs).toLocaleDateString();
}

export function hasOwnPropertySafe(obj: Record<string, any>, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * A data object from ConsenSource state is considered to be unclaimed
 * if there is an `assertion_id` property on the object.
 *
 * @param obj
 * @returns `false` if the passed object has an `assertion_id`
 *          property, otherwise, `true`
 */
export function isDataClaimed(obj: Record<string, any>) {
  return !hasOwnPropertySafe(obj, 'assertion_id');
}
