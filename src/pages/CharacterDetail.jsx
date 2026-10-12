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
    const [status, setStatus] = useState("loading"); // loading | success | notfound | error
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        async function load() {
            setStatus("loading");
            try {
                const data = await getCharacters();
                const found = data.find(c => c.id === Number(id));
                if (!active) return;

                if (found) {
                    setCharacter(found);
                    setStatus("success");
                } else {
                    setStatus("notfound");
                }
            } catch (err) {
                if (active) setStatus("error");
            }
        }

        load();
        return () => { active = false; };
    }, [id]);

    const background = getBackground(character?.element);
    const backgroundStyle = {
        background: `
        linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        url(${background})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
    };

    if (status === "loading") {
        return (
            <div className="detail-status" style={backgroundStyle}>
                <div className="detail-spinner" />
                <p className="detail-status-text">Carregando personagem...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="detail-status" style={backgroundStyle}>
                <p className="detail-status-text">Não foi possível carregar este personagem.</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>
            </div>
        );
    }

    if (status === "notfound") {
        return (
            <div className="detail-status" style={backgroundStyle}>
                <p className="detail-status-text">Personagem não encontrado.</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="detail-container" style={backgroundStyle}>
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Voltar
            </button>
            <img
            src={character.imageUrl}
            alt={character.name}
            className="detail-image"
            />

            <div className="detail-info">
            <h1 className="detail-name">{character.name}</h1>

            <div className="detail-badges">
                <span className="detail-badge">{character.element || "Nenhum"}</span>
                <span className="detail-badge">{character.nation}</span>
            </div>
            </div>
        </div>
    );
}

export default CharacterDetail;
