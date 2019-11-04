import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../settings';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} >delete</a>
    </td>
  </tr>
);

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    Axios.get(backendUrl + '/exercises/')
      .then(response => {
        console.log('response.data =', response.data);
        setExercises(response.data)
      });
  }, []);

  const deleteExercise = (id) => {
    Axios.delete(backendUrl + '/exercises/' + id)
      .then(res => console.log('delete exercise', res.data));

    setExercises(current => current.filter(el => el._id !== id));
  }

  const exerciseList = () => {
    return exercises.map(exercise => (
      <Exercise
        key={exercise._id}
        exercise={exercise}
        deleteExercise={() => deleteExercise(exercise._id)} />
    ));
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  )
}
