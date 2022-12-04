import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <h1>Hobbypin WIP</h1>
      < Switch>
        <Route to='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </>


  );
}

export default App;
