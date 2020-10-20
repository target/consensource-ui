export function getLocaleFromUnix(timestamp: number) {
  return new Date(timestamp).toLocaleDateString();
}
