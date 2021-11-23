import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AllCourse from "./Views/AllCourses";
import EnrolledCourses from "./Views/EnrolledCourses";
import MenuBar from "./Components/Menubar";
import LoginDialog from "./Components/dialog/LoginDialog";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
// menu bar -- replace previous button function

export default function App() {
  return (
    <Router>
      <div>
        <MenuBar />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <AllCourse />
          </Route>
          <Route path="/enrolled">
            <EnrolledCourses />
          </Route>
          {/* <Route path="/login">
            <LoginDialog />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


function login() {
  return (
    <div>
      <h2> login </h2>
    </div>
  );
}
