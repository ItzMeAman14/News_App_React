import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_APP_API_KEY
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={
            <News apiKey={apiKey} setProgress={setProgress} key={"general"} pageSize={pageSize} category="general"/>
          }/>
          <Route exact path="/sports" element={
            <News apiKey={apiKey} setProgress={setProgress} key={"sports"} pageSize={pageSize} category="sports"/>
          }/>
          <Route exact path="/health" element={
            <News apiKey={apiKey} setProgress={setProgress}  key={"health"} pageSize={pageSize} category="health"/>
          }/>
          <Route exact path="/business" element={
            <News apiKey={apiKey} setProgress={setProgress}  key={"business"} pageSize={pageSize} category="business"/>
          }/>
          <Route exact path="/entertainment" element={
            <News apiKey={apiKey} setProgress={setProgress}  key={"entertainment"} pageSize={pageSize} category="entertainment"/>
          }/>
          <Route exact path="/science" element={
            <News apiKey={apiKey} setProgress={setProgress}  key={"science"} pageSize={pageSize} category="science"/>
          }/>
          <Route exact path="/technology" element={
            <News apiKey={apiKey} setProgress={setProgress}  key={"technology"} pageSize={pageSize} category="technology"/>
          }/>
        </Routes>
      </Router>
      </div>
    )
  }

export default App