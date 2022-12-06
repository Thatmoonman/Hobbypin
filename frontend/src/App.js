import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserEditPage from "./components/UserEditPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <>
      <Navigation />
      < Switch>
        <Route exact path='/users/:username'>
          <UserProfilePage />
        </Route>
        <Route exact path='/users/:username/edit'>
          <UserEditPage />
        </Route>
      </Switch>
    </>


  );
}

export default App;
