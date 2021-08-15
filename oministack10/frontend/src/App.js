import React, { useState, useEffect } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api";
import DevItem from "./DevItem/index";
import DevForm from "./DevForm/index";

function App() {
  const [devs, setDevs] = useState([]);

  async function loadDevs() {
    const response = await api.get("/devs");
    setDevs(response.data);
  }
  useEffect(() => {
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    console.log(data);
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
    console.log(response.data);
  }

  async function handleDeleteDev(data) {
    await api.delete("/devs", { data });
    loadDevs();
  }

  async function handleEditDev(data) {
    const response = await api.put("/devs", data);
    console.log(response);
    await loadDevs();
  }

  return (
    <div id="App">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              _id={dev._id}
              key={dev._id}
              dev={dev}
              onDelete={handleDeleteDev}
              onEdit={handleEditDev}
            ></DevItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
