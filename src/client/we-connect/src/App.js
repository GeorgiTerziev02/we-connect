import React from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Posts from './components/posts'

function App() {
  return (
    <div className="App">
      <Header />
      <Posts />
      <Footer />
    </div>
  );
}

export default App;
