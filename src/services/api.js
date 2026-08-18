const BASE_URL = "http://localhost:5213/api";
const API_URL = `${BASE_URL}/characters`;
const AUTH_URL = `${BASE_URL}/auth`;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCharacters() {
  const response = await fetch(API_URL, {
    headers: authHeaders()
  });
  return response.json();
}

export async function createCharacter(character) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders()
    },
    body: JSON.stringify(character)
  });
}

export async function login(username, password) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos.");
  }

  return response.json();
}

export async function register(username, password) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const message = response.status === 409
      ? "Esse usuário já existe."
      : "Não foi possível criar a conta.";
    throw new Error(message);
  }

  return response.json();
}
