import Movies from "./interfaces/movies";

function availableMovies(movies: Array<Movies>, age: number) {
    console.log(movies)
    const allowedMovies = movies.filter((movie) => {
        return movie.minAge < age;
    });
    return allowedMovies;
}
module.exports = availableMovies;
