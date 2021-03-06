import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { backendUrl } from '../settings';

import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise(props) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());

  const userSelection = useRef();

  useEffect(() => {
    axios.get(backendUrl + '/exercises/'
      + props.match.params.id)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      }
      );

    axios.get(backendUrl + '/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      });
  }, [props.match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date
    };
    axios.post(backendUrl + '/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log('res.data', res.data));
    props.history.push('/');

    console.log('update =', backendUrl + '/exercises/update/' + props.match.params.id);
    console.log('exercise =', exercise);
  }

  return (
    <div>
      <h3>Edit exercise log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref={userSelection}
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            {
              users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Duration min:</label>
          <input type="number"
            required
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker type="text"
            selected={date}
            className="form-control"
            onChange={(e) => setDate(e)} />
          {/* onChange={(e) => setDescription(e.value)} /> */}
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise log"
            className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
