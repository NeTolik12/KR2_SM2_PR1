import React, { Component } from 'react';
import { Movies } from "../components/Movies";
import { Search } from "../components/search";
import { Preloader } from '../components/preloader';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyResult } from '../components/EmptyResult';

class Main extends Component {
    state = { 
        movies: [],
        loading: false,
        error: null,
        searchTerm: 'spider-man',
        searchType: ''
    };

    searchMovies = (search = 'spider-man', type = '') => {
        this.setState({ loading: true, error: null });
        
        let url = `http://www.omdbapi.com/?apikey=2cf997b8&s=${search}`;
        if(type) url += `&type=${type}`;

        fetch(url)
            .then((response) => {
                if(!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                if(data.Response === 'False') throw new Error(data.Error);
                this.setState({ 
                    movies: data.Search || [],
                    loading: false,
                    searchTerm: search,
                    searchType: type
                });
            })
            .catch((error) => {
                this.setState({ 
                    loading: false,
                    error: error.message,
                    movies: [] 
                });
            });
    }

    render() {
        const { movies, loading, error } = this.state;

        return  <main className='container content'>
           <Search searchMovies={this.searchMovies} />
           {loading ? <Preloader /> : (
               <>
                   {error && <ErrorMessage message={error} />}
                   {!error && movies.length ? <Movies movies={movies} /> : null}
                   {!error && !movies.length && <EmptyResult />}
               </>
           )}
        </main>
    }
}

export { Main };