const API_URL = process.env.REACT_APP_API_URL || "/api";

export async function fetchNotas() {
  const res = await fetch(`${API_URL}/notas`);
  return res.json();
}