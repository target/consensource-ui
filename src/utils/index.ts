export function getLocaleFromUnix(timestampSeconds: number) {
  const timestampMS = timestampSeconds * 1000;
  return new Date(timestampMS).toLocaleDateString();
}
