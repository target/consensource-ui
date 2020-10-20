export function getLocaleFromUnix(timestampSeconds: number) {
  const timestampMs = timestampSeconds * 1000;
  return new Date(timestampMs).toLocaleDateString();
}

export function hasOwnPropertySafe(obj: Record<string, any>, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
