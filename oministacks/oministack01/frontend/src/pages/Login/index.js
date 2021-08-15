import React, { useState } from "react";
import api from "../../services/api";

//toda rota recebe uma propriedade chamada history.
//precisa das chaves para pegar só a propriedade
export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); //previne a ação padrão do submit do form

    // tem que esperar a resposta da api
    const response = await api.post("/sessions", { email });
    //preciso pegar o email
    //temos que seguir a programação declarativa
    console.log(response);

    const { _id } = response.data;
    localStorage.setItem("user", _id); // isso aqui armazena o id no app, pra ele ficar disponível sempe
    //isso aqui faz a navegação automática
    history.push("/dashboard");
  }

  return (
    //o react precisa que todo mundo esteja dentro de um tag só para fazer o retorno dessa função.
    //então, coloca todo mundo em volta de um fragment.
    //o fragment evita que o css fique todo cagado
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para a sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="seu melhor email"
          value={email}
          onChange={event => setEmail(event.target.value)} //em event.target.value está o valor que o usuário preencheu no input
        />
        <button className="btn" type="submit ">
          Entrar
        </button>
      </form>
    </>
  );
}
