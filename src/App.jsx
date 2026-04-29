import { useEffect, useState } from "react";
import { getCharacters, createCharacter } from "./services/api";
import './App.css'
import { useNavigate } from "react-router-dom";
import ElementDropdown from "./components/ElementDropdown";

function App() {
  const [characters, setCharacters] = useState([]);

  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");

  const navigate = useNavigate();

  async function loadCharacters() {
    const data = await getCharacters();
    setCharacters(data);
  }

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    loadCharacters();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

   // 🔍 filtro
  const filteredCharacters = characters.filter(c => {
    const matchesName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesElement = element ? c.element === element : true;

    return matchesName && matchesElement;
  });

  return (
    <div className="app">
      {<div style={{ padding: "20px" }}>
        <h1>Personagens de Avatar</h1>

        {/* 🔎 BARRA DE BUSCA */}
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar personagem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ElementDropdown element={element} setElement={setElement} />
        </div>

        <div className="grid">
          {filteredCharacters.map(p => (
            <div 
              key={p.id} 
              className="card"
              onClick={() => navigate(`/character/${p.id}`)}
            >
              <img src={p.imageUrl} alt={p.name} />
              <h3>{p.name}</h3>
              <div
                className="favorite"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(p.id);
                }}
              >
                <span className={`star empty ${favorites.includes(p.id) ? "hide" : ""}`}>☆</span>
                <span className={`star filled ${favorites.includes(p.id) ? "show" : ""}`}>⭐</span>
              </div>
            </div>
          ))}             
        </div>
      </div>}
    </div>
    
  );
}

export default App;