import { useState } from 'react';
import { MovieDetails } from './MovieDetails';

export function Movie(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Title: title, Year: year, imdbID: id, Type: type, Poster: poster } = props;

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=8c8f22c8&i=${id}&plot=full`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDetails = async () => {
    if (!showDetails && !movieDetails) {
      await fetchMovieDetails();
    }
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div id={id} className="movie card" onClick={toggleDetails}>
        <div className="card-image waves-effect waves-block waves-light">
          {poster === 'N/A' ? (
            <img className="activator" src={`https://via.placeholder.com/300x400?text=${title}`} alt="" />
          ) : (
            <img className="activator" src={poster} alt="" />
          )}
        </div>
        <div className="card-content">
          <span className="card-title activator gray-text">{title}</span>
          <p>{year} <span className="right">{type}</span></p>
        </div>
      </div>

      {showDetails && movieDetails && (
        <MovieDetails 
          movie={{...props, ...movieDetails}} 
          onClose={toggleDetails} 
          isLoading={isLoading}
        />
      )}
    </>
  );
}