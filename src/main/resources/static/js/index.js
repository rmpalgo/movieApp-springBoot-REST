$(document).ready( () => {
    console.log("DOM IS READY!");

    $('#button-add').click( (e) => {
        e.preventDefault();
        addMovieToJSON();
    });

    function displayMoviesFromJSON() {
        api.getMovies().then((movies) => {
            console.log('Here are all the movies:');
            let HTML = ``;

            movies.forEach(({title, rating, poster, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                HTML += `<div class="card mt-6 bg-transparent" style="width: 11rem;">
<div class="dropdown">
  <span><i class="fas fa-ellipsis-h three-dots" ></i></span>
  <div class="dropdown-content">
  <p class="edit-title" data-id="${title}/${id}">Edit</p>
  <a id="delete-movie" data-id="${id}">Delete</a>
  </div>
</div>
 <img src="${poster}" class="card-img-top" alt="..."><p class="pt-1"><span>${title}</span> <span>${rating}</span></p></div>`
            });
            $('#movies-display').html(HTML);
            editMovieForm();
            deleteMovie();

        }).catch((error) => {
            console.log(error);
        });
    }

    // Initialize Page
    ( () => { renderLoading();
        displayMoviesFromJSON();
    })();

    function editMovieForm() {
        $('.edit-title').on('click', function (e) {
            e.preventDefault();
            let dataID = $(this).attr('data-id').split("/");
            let title = dataID[0];
            let uniqueID = dataID[1];
            console.log(uniqueID);

            console.log("DATA ID", title);
            $(this).parent().parent().next().next().html(`<input class="input-text bg-transparent border-0" type="text" value="${title}" autofocus>
                                       <select class="movie-rating mt-2">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select><button class="mt-2 save-button" data-id="${uniqueID}" id="${uniqueID}">Save</button>`)

            //activate click listener for save button
            $('.save-button').on('click', (e) => {
                e.preventDefault();
                console.log("CLICKED");
                let newTitle =  $(this).parents().eq(2).children().last().children().first().val();
                console.log(newTitle);
                let newRating = $(this).parents().eq(2).children().last().children().first().next().val();
                console.log(newRating);
                editMovieToJSON(uniqueID, newTitle, newRating);
            });
        });
    }

    function deleteMovie() {
        $('#delete-movie').on("click", function(e) {
            e.preventDefault();
            let dataID = $(this).attr('data-id');
            api.deleteMovie(dataID).then( response => response.json() )
                .catch( error => console.log(error));
        });
    }


    function addMovieToJSON () {
        let movieTitleValue = $('#add-title').val();
        let ratingValue = $('#rate-movie').val();
        getOMBDMovieDataFromAPI(movieTitleValue, ratingValue);
    }

    function editMovieToJSON (uniqueID, newTitle, newRating) {
        console.log('fromMovieToJSON', uniqueID);
        console.log('fromMovieToJSON', newTitle);
        console.log('fromMovieToJSON', newRating);
        getOMBDAndEditMovie(newTitle, newRating, uniqueID);
    }

    function getOMBDAndEditMovie (newTitle, newRating, uniqueID) {
        renderLoading();
        api.getOMBDData( newTitle ).then( movieData => {
            let newMoviePoster = movieData.Search[0].Poster;
            let newMovieObj = {
                id: uniqueID,
                title: newTitle,
                rating: newRating,
                poster: newMoviePoster
            }
            api.editMovie(newMovieObj, uniqueID).then( response => { console.log(response); displayMoviesFromJSON();})
                .catch( error => console.log(error) );
        });
    }


    function renderLoading () {
        $('#movies-display').html('<p id="loading" class="mt-5 text-center">Loading<span>.</span><span>.</span><span>.</span></p>')
    }

    function getOMBDMovieDataFromAPI (movieTitleValue, ratingValue) {
        renderLoading();
        api.getOMBDData( movieTitleValue ).then( movieData => {
            console.log(movieData);
            let moviePoster = movieData.Search[0].Poster;
            console.log(moviePoster);
            api.addMovie( {
                title: movieTitleValue,
                rating: ratingValue,
                poster: movieData.Search[0].Poster
            }).then( result => {
                console.log(result)
                displayMoviesFromJSON();
            });
        }).catch( error => console.log(error) );
    }

});