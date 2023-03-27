import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import BoardShow from "./components/Boards/BoardShowPage";
import Navigation from "./components/Navigation";
import AllPinsIndex from "./components/Pins/AllPinsIndex";
import PinShowPage from "./components/Pins/PinShowPage";
import UserAllPinsBoard from "./components/Pins/UsersPinsIndex";
import UserEditPage from "./components/UserEditPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  // const currentUser = useSelector(state => state.session.user)
  // const isMobile = /Android|iPhone/i.test(navigator.userAgent)

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
          <Route exact path='/users/:userId/boards/:boardId'>
            <BoardShow />
          </Route>
          <Route exact path='/users/:userId/pins'>
            <UserAllPinsBoard />
          </Route>
          <Route exact path='/users/:userId/pins/:pinId'>
            <PinShowPage />
          </Route>
          <Route exact path='/'>
            <AllPinsIndex />
          </Route>
          <Route path='/'>
            <Redirect to='/'/>
          </Route>
        </Switch>
      </>
    ) 
}

export default App;
