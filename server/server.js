const express = require("express");
const path = require("path");

const app = express();

const movies = require("./movies_metadata.json");



app.get("/api/movies", (req, res) => {

  const movieList = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));

  res.json(movieList);

});




app.get("/api/movies/:id", (req, res) => {

  const movie = movies.find(
    m => String(m.id) === req.params.id
  );

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found"
    });
  }

  res.json(movie);

});



let port;

if (process.env.NODE_ENV === "production") {

  port = process.env.PORT || 3000;

  app.use(express.static(
    path.join(__dirname, "../build")
  ));

  app.get("*", (req, res) => {

    res.sendFile(
      path.join(__dirname, "../build/index.html")
    );

  });

}
else {

  port = 3001;

}


app.listen(port, () => {

  console.log("Server running on", port);

});