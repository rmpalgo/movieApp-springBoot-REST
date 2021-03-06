const api = {

    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },

    addMovie: (movieObj) => {
        return fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        })
            .then( response => response.json() )
            .catch( error => console.log(error));
    },
    editMovie: (movieObj, id) => {
        return fetch(`/api/movies/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        });
    },

    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    getSingleMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then( response => response.json() );
    },

    getOMBDData: (addMovieTitle) => {
        return fetch(`http://www.omdbapi.com?s=${addMovieTitle}&apikey=${ombd_key}`)
            .then( response => response.json() );
    }
};