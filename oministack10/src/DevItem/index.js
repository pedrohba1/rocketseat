import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faWindowClose,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "./../components/LoadingAnimation.jsx";

function DevItem({ dev, onDelete, onEdit, _id }) {
  const [mode, setMode] = useState("");

  const [name, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState("");

  async function handleDelete() {
    await onDelete({ ...dev });
  }

  async function handleEdit() {
    await onEdit({ _id: dev._id, name, techs, bio });
    toggleMode("notEdit");
  }

  const toggleMode = mode => {
    setMode(mode);
  };

  useEffect(() => {
    setGithubUsername(dev.name);
    setTechs(dev.techs.join(", "));
    setBio(dev.bio);
  }, []);

  if (mode === "edit") {
    return (
      <li className="dev-item">
        <React.Fragment>
          <header>
            <img src={dev.avatar_url} alt={dev.name}></img>
            <div className="user-info">
              <textarea
                className="textarea"
                value={name}
                onChange={e => setGithubUsername(e.target.value)}
              ></textarea>
              <textarea
                className="textarea"
                value={techs}
                onChange={e => setTechs(e.target.value)}
              ></textarea>
            </div>
          </header>
          <textarea
            className="textarea-bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          ></textarea>
        </React.Fragment>

        <div className="">
          <a className="github-link" href={`https://github.com/${dev.name}`}>
            Acessar perfil no github
          </a>
        </div>
        <div className="bottom">
          <span onClick={() => toggleMode("close")} className="close-button">
            <FontAwesomeIcon icon={faWindowClose} size="1x" />
          </span>
          <span onClick={handleEdit} className="check-button">
            <FontAwesomeIcon icon={faCheck} size="1x" />
          </span>
          {loading}
        </div>
      </li>
    );
  } else {
    return (
      <li className="dev-item">
        <React.Fragment>
          <header>
            <img src={dev.avatar_url} alt={dev.name}></img>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(", ")}</span>
            </div>
          </header>
          <p>{dev.bio} </p>
        </React.Fragment>

        <div className="">
          <a className="github-link" href={`https://github.com/${dev.name}`}>
            Acessar perfil no github
          </a>
        </div>
        <div className="bottom">
          <span onClick={handleDelete} className="close-button">
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </span>{" "}
          <span onClick={() => toggleMode("edit")} className="edit-button">
            <FontAwesomeIcon icon={faEdit} size="1x" />
          </span>
          {loading}
        </div>
      </li>
    );
  }
}

export default DevItem;
