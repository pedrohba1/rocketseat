import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
    const [tech, setTech] = useState([]);
    const [newTech, setNewTech] = useState("");


    function handleAdd() {
        setTech([...tech, newTech]);
    }

    useEffect(() => {
        const storageTech = localStorage.getItem('tech');
        if(storageTech){
            setTech(JSON.parse(storageTech));
        }


    }, []);

    useEffect(() => {
        localStorage.setItem("tech", JSON.stringify(tech));
    }, [tech]);

    const techSize = useMemo(() => tech.length, [tech]);
    return (
      <>
        <ul>
          {tech.map(item => (
            <li key={item}>{item}</li>
                ))}
          <strong>
            {' '}
            você tem
            {' '}
            {techSize}
            {' '}
            tecnologias
          </strong>
        </ul>

        <input onChange={e => setNewTech(e.target.value)} value={newTech} />
        <button type="button" onClick={handleAdd}>
          adicionar
        </button>

      </>
    );
}

export default App;
