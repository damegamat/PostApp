import React from "react";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Head">
          <Header />
        </header>
        <nav className="Site-navigation">
          <Navigation />
        </nav>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
