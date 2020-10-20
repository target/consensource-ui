export function getLocaleFromUnix(timestampSeconds: number) {
  const timestampMS = timestampSeconds * 1000;
  return new Date(timestampMS).toLocaleDateString();
}

export function hasOwnPropertySafe(obj: Record<string, any>, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
