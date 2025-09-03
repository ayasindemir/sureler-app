export async function fetchSureList() {
  const response = await fetch('http://localhost:8080/sure/getAllSure'); // Liste API
  return response.json();
}

export async function fetchSureDetail(id) {
  const response = await fetch(`http://localhost:8080/kuran/getBySureNo?sureNo=${id}`); // Detay API
  return response.json();
}