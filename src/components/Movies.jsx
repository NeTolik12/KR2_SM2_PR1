import { Movie } from "./Movie";

export function Movies(props) {
  const { movies } = props;
  return (
    <div className="movies">
      {movies.map(movie => (
        <Movie 
          key={movie.imdbID} 
          Title={movie.Title}
          Year={movie.Year}
          imdbID={movie.imdbID}
          Type={movie.Type}
          Poster={movie.Poster}
        />
      ))}
    </div>
  );
}