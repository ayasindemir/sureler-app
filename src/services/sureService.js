export async function fetchSureList() {
  const response = await fetch('https://kurananaliz.onrender.com/sure/getAllSure'); // Liste API
  return response.json();
}

export async function fetchSureDetail(id) {
  const response = await fetch(`https://kurananaliz.onrender.com/kuran/getBySureNo?sureNo=${id}`); // Detay API
  return response.json();
}