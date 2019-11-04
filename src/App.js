import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar.js';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
function App() {
  return (
    <BrowserRouter basename="/mern-exercise-tracker-3/" >
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </BrowserRouter >
  );
}

export default App;
