import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    techs: ["node.js", "reactjs", "react-native"],
    newTech: ""
  };

  //executa assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }
  //executado sempre que houver alterações nas props ou no estado
  //usar o componentDidUpdate é um jeito mais performático de setar
  //os estados.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  //executado quando o componente deixa de existir
  //cria um event listener
  componentWillMount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    let newTechs = [...this.state.techs, this.state.newTech];
    this.setState({ techs: newTechs, newTech: "" });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={this.handleDelete}
            ></TechItem>
          ))}
        </ul>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.state.newTech}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
