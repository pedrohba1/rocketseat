import React from "react";
import "./App.css";
import Header from "./components/Header";
import PostList from "./components/PostList";
function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <PostList></PostList>
    </React.Fragment>
  );
}

export default App;
