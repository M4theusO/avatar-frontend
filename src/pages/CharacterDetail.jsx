import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacters } from "../services/api";
import "./CharacterDetail.css";
import waterBg from "../assets/water.jpg";
import fireBg from "../assets/fire.jpg";
import earthBg from "../assets/earth.jpg";
import airBg from "../assets/air.jpg";
import defaultBg from "../assets/backgroud.jpg";

function getBackground(element) {
  switch (element) {
    case "Água":
      return waterBg;
    case "Fogo":
      return fireBg;
    case "Terra":
      return earthBg;
    case "Ar":
      return airBg;
    default:
      return defaultBg;
  }
}

function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
        const data = await getCharacters();
        const found = data.find(c => c.id === Number(id));
        setCharacter(found);
        }
        load();
    }, [id]);

    if (!character) return <p>Carregando...</p>;

    const background = getBackground(character.element);

    return (
        <div className="detail-container"
            style={{
                background: `
                linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                url(${background})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Voltar
            </button>
            <img 
            src={character.imageUrl} 
            className="detail-image"
            />

            <div className="detail-info">
            <h1 className="detail-name">{character.name}</h1>

            <p className="detail-text">
                <strong>Elemento:</strong> {character.element || "Nenhum"}
            </p>

            <p className="detail-text">
                <strong>Nação:</strong> {character.nation}
            </p>
            </div>
        </div>
    );
}

export default CharacterDetail;