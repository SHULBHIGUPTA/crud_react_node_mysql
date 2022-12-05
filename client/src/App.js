import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = React.useState('');
  const [review, setReview] = React.useState('');
  const [movielist, setMovieList] =React.useState('');
  const [newReview, setNewReview] = React.useState('')

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    })
  }, [])

  const submitthedata = () => {
    Axios.post("http://localhost:3001/api/insert", {movieName, movieReview: review})
    .then(() => {
      setMovieList([...movielist, {movieName, movieReview: review}]);
    })
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {movieName: movie, movieReview: newReview});
    setNewReview("")
  }

  return (
    <div className="App">
      <input value={movieName} onChange={e => setMovieName(e.target.value)}/>
      <input value={review} onChange={e => setReview(e.target.value)}/>
      <button onClick={submitthedata}>Submit</button>
      {movielist.map((val) => {
        return (
        <div>
        <h1>{val.movieName} | {val.movieReview}</h1>
        <button onClick={() => deleteReview(val.movieName)}>delete</button>
        <input type="text" onChange={e => setNewReview(e.target.value)}/>
        <button onClick={() => updateReview(val.movieName)}>update</button>
        </div>
        )
      })}
    </div>
  )
}

export default App;
