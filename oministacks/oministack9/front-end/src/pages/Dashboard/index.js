import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    /* 
    essa função anônima executa a função anônima, quando 
    houver necessidade pelo array de dependências */

    async function loadSposts() {
      const user_id = localStorage.getItem("user");
      console.log(user_id);
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });
      console.log(response.data);
      setSpots(response.data);
    }
    loadSposts();
  }, []); //não tenho nenhuma dependência, então eu passo um array vazio.

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        {" "}
        <button className="btn"> Adicionar novo spot</button>{" "}
      </Link>
    </>
  );
}
