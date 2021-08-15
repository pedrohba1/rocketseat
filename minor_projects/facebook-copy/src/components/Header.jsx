import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import "../styles/header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar header-color">
        <ul className="nav navbar-right inline">
          <li>
            <span className="font-big">facebook</span>
            <MaterialIcon
              color={"#fff"}
              size={8}
              icon="copyright"
            ></MaterialIcon>
          </li>
        </ul>

        <a>
          <ul className="nav navbar-right inline">
            <li>
              <span className="font-profile">Meu perfil </span>
            </li>
            <li className="ml-2">
              <MaterialIcon color={"#fff"} icon="person_pin"></MaterialIcon>
            </li>
          </ul>
        </a>
      </nav>
    );
  }
}

export default Header;
