import React, { Component } from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Posts from './components/posts'
import Login from './components/login';
import Register from './components/register';
import SharePost from './components/share-post'
import NotFound from './components/not-found';
import Profile from './components/profile';
import PostDetails from './components/post-details';
import UserContext from './Context';
import SearchResults from './components/search-results';
import Home from './components/home';

// TODO: Try lazy loading
class Navigation extends Component {
    static contextType = UserContext
    render() {
        const {
            loggedIn
        } = this.context

        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/posts" exact component={Posts} />
                            <Route path="/search/:params">
                                {loggedIn ? (<SearchResults />) : (<Redirect to="/login" />)}
                            </Route>
                            <Route path="/user/:userId">
                                {loggedIn ? (<Profile />) : (<Redirect to="/login" />)}
                            </Route>
                            <Route path="/posts/:postId">
                                {loggedIn ? (<PostDetails />) : (<Redirect to="/login" />)}
                            </Route>
                            <Route path="/login">
                                {loggedIn ? (<Redirect to="/" />) : (<Login />)}
                            </Route>
                            <Route path="/register">
                                {loggedIn ? (<Redirect to="/" />) : (<Register />)}
                            </Route>
                            <Route path="/share-post">
                                {loggedIn ? (<SharePost />) : (<Redirect to="/login" />)}
                            </Route>
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default Navigation