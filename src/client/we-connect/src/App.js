import React from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Posts from './components/posts'
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact><Redirect to="posts"></Redirect></Route>
            <Route path="/posts" component={Posts} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
