import fetch from "node-fetch";
import cities from "../routes/data/cities.js";

export async function apiFetch(addr, options) {
  const res = await fetch(add, options);
  const json = await res.json();

  if (res.ok) {
    return json;
  } else {
    throw new Error(json);
  }
}

export async function fakeFetch(addr, options) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const url = new URL(addr, "http://localhost:8000");
  switch (url.pathname) {
    case `/api/cities`:
      const [city] = cities.filter((city) => {
        return city.name === url.searchParams.get("city");
      });
      return city;
    default:
      return { error: "no such addr" };
  }
}
