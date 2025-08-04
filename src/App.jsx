import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Success from "./components/Success";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route>
            <Success path="/success" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
