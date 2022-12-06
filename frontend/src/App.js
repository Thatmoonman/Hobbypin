import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <>
      <Navigation />
      <h1>Hobbypin WIP</h1>
      < Switch>
        <Route path='/users/:userId'>
          <UserProfilePage />
        </Route>
      </Switch>
    </>


  );
}

export default App;
