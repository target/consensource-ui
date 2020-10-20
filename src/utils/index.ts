export function getLocaleFromUnix(timestampSeconds: number) {
  const timestampMs = timestampSeconds * 1000;
  return new Date(timestampMs).toLocaleDateString();
}
