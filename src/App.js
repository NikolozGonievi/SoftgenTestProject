import React from 'react';
import PostList from './components/postList/PostList';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PostPage from './components/postPage/PostPage';

import './App.css';

const App = (props) => {


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' > <PostList /> </Route>
          <Route path='/posts/:id?' component={PostPage} />
        </Switch>
      </Router>

      {/*     <PostList/>
 */} </div>
  );
}

export default App;
