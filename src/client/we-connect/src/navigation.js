import React from 'react'
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

// TODO: Try lazy loading
const Navigation = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <main>
                    <Switch>
                        <Route path="/" exact><Redirect to="posts"></Redirect></Route>
                        <Route path="/user/:userId" component={Profile} />
                        <Route path="/posts/:postId" component={PostDetails} />
                        <Route path="/posts" component={Posts} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/share-post" component={SharePost} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default Navigation