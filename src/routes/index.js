import React from "react"
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import CharacterDetails from "../pages/CharacterDetails";


const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route
        path="/home"
        render={() => { <Home /> }}
      />

      <Route
        path="/character"
        render={({ location }) => {
          return (<CharacterDetails character={location.state} />)
        }}
      />
    </Switch>
  )
}

export default Routes;
