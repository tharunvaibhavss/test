import React, { useEffect, useState } from "react";

import "./App.css";


function App() {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {

    fetch("/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));

  }, []);




  const openMovie = async(id)=>{

    const movie = await fetch(
      `/api/movies/${id}`
    ).then(res=>res.json());

    setSelectedMovie(movie);

  }



  const formatDate = (date)=>{

    if(!date) return "";

    const [day,month,year] = date.split("/");

    const fullYear =
      Number(year) > 50
      ? `19${year}`
      : `20${year}`;

    const d = new Date(
      `${fullYear}-${month}-${day}`
    );

    return d.toLocaleDateString();

  }



  if(selectedMovie){

    return (

      <div className="container">
      <div className="details">

        <button
          onClick={()=>setSelectedMovie(null)}
        >
          ← Back
        </button>


        <h1>
          {selectedMovie.title}
        </h1>


        {
          Object.entries(selectedMovie)
          .map(([key,value])=>(

            <p key={key}>

              <strong>
                {key}:
              </strong>

              {

                key==="release_date"

                ?

                formatDate(value)

                :

                key==="runtime"

                ?

                `${value} minutes`

                :

                String(value)

              }

            </p>

          ))
        }

      </div>
      </div>

    )

  }



  return (

    <div className="container">
    <div className="details">

      <h1>
        Movies
      </h1>


      <div className="movie-grid">

        {

          movies.map(movie=>(

            <div

              className="movie-card"

              key={movie.id}

              onClick={()=>
                openMovie(movie.id)
              }

            >

              <h3>
                {movie.title}
              </h3>

              <p>
                {movie.tagline || "No tagline"}
              </p>

              <strong>
                {movie.vote_average}/10
              </strong>

            </div>

          ))

        }

      </div>

    
    </div>
    </div>

  )

}

export default App;