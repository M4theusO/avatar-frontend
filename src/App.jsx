import { useEffect, useState } from "react";
import { getCharacters, createCharacter } from "./services/api";
import './App.css'
import { useNavigate } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  async function loadCharacters() {
    const data = await getCharacters();
    setCharacters(data);
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div className="app">
      {<div style={{ padding: "20px" }}>
        <h1>Personagens de Avatar</h1>

        <div className="grid">
                {characters.map(p => (
                  <div 
                    key={p.id} 
                    className="card"
                    onClick={() => navigate(`/character/${p.id}`)}
                  >
                    <img src={p.imageUrl} alt={p.name} />
                    <h3>{p.name}</h3>
                  </div>
                ))}             
        </div>
      </div>}
    </div>
    
  );
}

export default App;