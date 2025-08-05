import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Success from "./components/Success";
import Trial from "./components/Trial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/trial">
            <Trial />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
