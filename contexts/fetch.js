export async function fetchJson(link) {
  console.log(link);
  const response = await fetch(link);
  if (response.error) return undefined;
  const raw = await response.json();
  // (raw);
  return raw;
}
