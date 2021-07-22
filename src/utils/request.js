import { fetchlist } from "./http";

export async function fetchFlowersList() {
  const res = await fetch("http://localhost:8000/flowersList");
  const json = await res.json();
  return json;
}
export async function fetchCustomersList() {
  const res = await fetch("http://localhost:8000/customersList");
  const json = await res.json();
  return json;
}
export async function fetchBlogPostsList() {
  const res = await fetch("http://localhost:8000/blogpostsList");
  const json = await res.json();
  return json;
}
export async function fetchSmilesList() {
  const res = await fetch("http://localhost:8000/smilesList");
  const json = await res.json();
  return json;
}
