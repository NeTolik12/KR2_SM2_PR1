import { useState } from 'react';

export function Movie(props) {
  const [expanded, setExpanded] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Title: title, Year: year, imdbID: id, Type: type, Poster: poster } = props;

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=8c8f22c8&i=${id}&plot=short`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = async () => {
    if (!expanded && !movieDetails) {
      await fetchMovieDetails();
    }
    setExpanded(!expanded);
  };

  return (
    <div className={`movie-card ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="card-main">
        <div className="card-image">
          {poster === 'N/A' ? (
            <img src={`https://via.placeholder.com/300x450?text=${title}`} alt={title} />
          ) : (
            <img src={poster} alt={title} />
          )}
        </div>
        <div className="card-basic-info">
          <h3>{title}</h3>
          <p>{year} • {type}</p>
        </div>
      </div>
      
      {expanded && (
        <div className="card-details">
          {isLoading ? (
            <div className="loading-spinner">Загрузка...</div>
          ) : (
            <>
              <div className="movie-plot">
                <p>{movieDetails?.Plot || 'Описание отсутствует'}</p>
              </div>
              
              {movieDetails?.Ratings?.length > 0 && (
                <div className="movie-ratings">
                  <h4>Рейтинги:</h4>
                  <ul>
                    {movieDetails.Ratings.map((rating, index) => (
                      <li key={index}>
                        <span>{rating.Source}: </span>
                        <strong>{rating.Value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="movie-meta">
                <p><strong>Жанр:</strong> {movieDetails?.Genre || 'Не указан'}</p>
                <p><strong>Режиссер:</strong> {movieDetails?.Director || 'Не указан'}</p>
                <p><strong>Актеры:</strong> {movieDetails?.Actors || 'Не указаны'}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}