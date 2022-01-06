
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
import AuthorForm from './components/AuthorForm';
import AuthorList from './components/AuthorList';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/new_author">
            <AuthorForm />
          </Route>
          <Route exact path="/authors/:id">
            <Detail />
          </Route>
          <Route exact path="/authors/:id/edit">
            <Update />
          </Route>
          <Route exact path="/authors">
            <AuthorList />
          </Route>
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
