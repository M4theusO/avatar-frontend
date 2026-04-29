import { useState } from "react";
import "./ElementDropdown.css";

const elements = ["Todos", "Água", "Fogo", "Terra", "Ar"];

function ElementDropdown({ element, setElement }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (el) => {
    setElement(el === "Todos" ? "" : el);
    setOpen(false);
  };

  return (
    <div 
      className="dropdown"
      onMouseLeave={() => setOpen(false)} // fecha ao sair
    >
      {/* BOTÃO PRINCIPAL */}
      <div 
        className="dropdown-selected"
        onClick={() => setOpen(!open)}
      >
        {element || "Todos"}
        <span className={`arrow ${open ? "open" : ""}`}>▼</span>
      </div>

      {/* OPÇÕES */}
      <div className={`dropdown-menu ${open ? "show" : ""}`}>
        {elements.map((el) => (
          <div
            key={el}
            className="dropdown-item"
            onClick={() => handleSelect(el)}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementDropdown;