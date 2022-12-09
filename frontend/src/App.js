import { Switch, Route } from "react-router-dom";
import BoardShow from "./components/Boards/BoardShowPage";
import Navigation from "./components/Navigation";
import AllPinsIndex from "./components/Pins/AllPinsIndex";
import UserEditPage from "./components/UserEditPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <>
      <Navigation />
      < Switch>
        <Route exact path='/users/:userId'>
          <UserProfilePage />
        </Route>
        <Route exact path='/users/:userId/edit'>
          <UserEditPage />
        </Route>
        <Route path='/users/:userId/boards/:boardId'>
          <BoardShow />
        </Route>
        <Route path='/'>
          <AllPinsIndex />
        </Route>
      </Switch>
    </>


  );
}

export default App;
