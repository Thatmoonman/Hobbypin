import { Switch, Route } from "react-router-dom";
import BoardShow from "./components/Boards/BoardShowPage";
import Navigation from "./components/Navigation";
import AllPinsIndex from "./components/Pins/AllPinsIndex";
import PinShowPage from "./components/Pins/PinShowPage";
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
        <Route path='/users/:userId/pins/:pinId'>
          <PinShowPage />
        </Route>
        <Route exact path='/'>
          <AllPinsIndex />
        </Route>
      </Switch>
    </>


  );
}

export default App;
