const API_URL = "http://localhost:5213/api/characters";

export async function getCharacters() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createCharacter(character) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(character)
  });
}