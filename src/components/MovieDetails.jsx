import { useEffect } from 'react';
import { Preloader } from './preloader';

export function MovieDetails({ movie, onClose, isLoading }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          
          {isLoading ? (
            <div className="modal-loading">
              <Preloader />
            </div>
          ) : (
            <div className="modal-grid">
              <div className="modal-poster">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : `https://via.placeholder.com/300x450?text=${movie.Title}`} 
                  alt={movie.Title} 
                />
              </div>
              
              <div className="modal-info">
                <h2>{movie.Title}</h2>
                <div className="modal-meta">
                  <span>{movie.Year}</span>
                  <span>{movie.Type}</span>
                  <span>IMDb ID: {movie.imdbID}</span>
                </div>
                
                <div className="modal-plot">
                  <h3>Описание</h3>
                  <p>{movie.Plot || 'Описание отсутствует'}</p>
                </div>
                
                <div className="modal-rating">
                  <h3>Рейтинг</h3>
                  {movie.Ratings?.length > 0 ? (
                    movie.Ratings.map(rating => (
                      <div key={rating.Source} className="rating-item">
                        <span>{rating.Source}: </span>
                        <strong>{rating.Value}</strong>
                      </div>
                    ))
                  ) : (
                    <p>Рейтинги отсутствуют</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}