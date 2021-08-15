import React from "react";
import "./App.css";
import logo from "./assets/logo.svg";
import Routes from "./routes";

function App() {
  //esse array faz a desestruturação

  return (
    <div className="container">
      <img src={logo} alt="" />
      <div className="content">
        <Routes></Routes>
      </div>
    </div>
  );
}

export default App;
