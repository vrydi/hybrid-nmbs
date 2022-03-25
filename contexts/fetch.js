export async function fetchJson(link) {
  try {
    console.log(link);
    const raw = await (await fetch(link)).json();
    // console.log(raw);
    return raw;
  } catch (error) {}
}
