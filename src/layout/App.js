import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Main from "./Main";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Head">
          <Header />
        </header>
        <nav>
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
