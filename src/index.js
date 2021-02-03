import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { PopInABox } from "./components/PopInABox";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PopInABox />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
