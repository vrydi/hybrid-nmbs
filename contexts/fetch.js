export async function fetchJson(link) {
  try {
    const raw = await (await fetch(link)).json();
    return raw;
  } catch (error) {}
}
