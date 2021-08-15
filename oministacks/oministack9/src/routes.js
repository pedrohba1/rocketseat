import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import New from "./pages/New";
import Dashboard from "./pages/Dashboard";

export default function Routes() {
  // tem que usar o exact component porque o react lê a path inteira e se ele achar
  //uma / na path vai ficar redirecionando pro login toda hora.
  // desse jeito, só redireciona pro login se tiver só a /
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/new" component={New}></Route>
      </Switch>
    </BrowserRouter>
  );
}
