import React from "react";

class Search extends React.Component {
    state = {
        search: '',
        type: ''
    };

    handleKey = (e) => {
        if(e.key === 'Enter') this.props.searchMovies(this.state.search, this.state.type);
    }

    handleTypeChange = (e) => {
        this.setState({ type: e.target.value }, () => {
            this.props.searchMovies(this.state.search, this.state.type);
        });
    }

    render() {
        return (
            <div className="search-container">
                <div className="search-bar">
                    <div className="input-wrapper">
                        <input 
                            className="search-input"
                            placeholder="Введите название фильма..."
                            type="search"
                            value={this.state.search}
                            onChange={(e) => this.setState({ search: e.target.value })}
                            onKeyDown={this.handleKey}
                        />
                        <button 
                            className="search-button"
                            onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>
                            <i className="material-icons">search</i>
                        </button>
                    </div>
                    
                    <div className="filters">
                        {['', 'movie', 'series', 'episode'].map((type) => (
                            <label key={type} className={`filter-label ${this.state.type === type ? 'active' : ''}`}>
                                <input 
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={this.state.type === type}
                                    onChange={this.handleTypeChange}
                                />
                                <span className="filter-text">
                                    {this.getTypeLabel(type)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    getTypeLabel(type) {
        switch(type) {
            case 'movie': return 'Фильмы';
            case 'series': return 'Сериалы';
            case 'episode': return 'Эпизоды';
            default: return 'Все';
        }
    }
}

export { Search };