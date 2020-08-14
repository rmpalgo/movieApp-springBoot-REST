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

            movies.forEach(({title, rating, poster, year, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                HTML += `
<div class="card mt-6 bg-transparent" style="width: 11rem;">
    <div class="dropdown">
      <span><i class="fas fa-ellipsis-h three-dots" ></i></span>
      <div class="dropdown-content">
      <p id="delete-movie" data-id="${id}">Delete</p>
      </div>
    </div>
    <img src="${poster}" data-id="${id}" id="poster-img" class="card-img-top" alt="...">
    <p class="pt-1">
        <p>${title} <span>${year}</span></p> Rating: 
        <span>${rating}</span>
    </p>
</div>`
            });
            $('#movies-display').html(HTML);
            deleteMovie();
            singlePageView();
        }).catch((error) => {
            console.log(error);
        });
    }

    // Initialize Page
    ( () => { renderLoading();
        displayMoviesFromJSON();
    })();

    function deleteMovie() {
        $('p#delete-movie').on('click', function(e) {
            e.preventDefault();
            let dataID = $(this).attr('data-id');
            console.log("delete ID" + dataID)
            api.deleteMovie(dataID).then( response => {
                renderLoading();
                displayMoviesFromJSON();
            } )
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
            let year = movieData.Search[0].Year;
            console.log("YEAR: " + year);
            let newMovieObj = {
                id: uniqueID,
                title: newTitle,
                rating: newRating,
                poster: newMoviePoster,
                year: year
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
            let year = movieData.Search[0].Year;
            console.log("YEAR: " + year);
            console.log(moviePoster);
            api.addMovie( {
                title: movieTitleValue,
                rating: ratingValue,
                poster: movieData.Search[0].Poster,
                year: year

            }).then( result => {
                console.log(result)
                displayMoviesFromJSON();
            });
        }).catch( error => console.log(error) );
    }

    function singlePageView() {
        let singleTitle = $("img#poster-img");
        singleTitle.on("click", function () {
            let id = $(this).attr('data-id');
            console.log(id);
            viewSinglePage(id);
        });
        singleTitle.css("cursor", "pointer");
    }

    function viewSinglePage(id) {
        renderLoading();
        let mainPage = $('#movies-display');
        mainPage.empty();
        let HTML = ``;
        api.getSingleMovie(id).then( (movie) => {
            console.log(movie);
                HTML += `<div class="card mt-6 bg-transparent" style="width: 18rem;">
                <div class="dropdown">
                    <span><i class="fas fa-ellipsis-h three-dots" style="left: 268px"></i></span>
                <div class="dropdown-content" style="min-width: 220px">
                <p id="delete-movie" data-id="${movie.id}">Delete</p>
                </div>
                </div>
                <img src="${movie.poster}" data-id="${movie.id}" id="poster-img" alt="..."><input class="input-text bg-transparent border-0" type="text" value="${movie.title}" autofocus>
                                       <select class="movie-rating mt-2">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select><button class="mt-2 save-button" id="${movie.id}">Save</button></div>`
            mainPage.html(HTML);
            deleteMovie();
            editMovieForm();
        })
    }

    function editMovieForm() {
        let saveButton = $('button.save-button');
        saveButton.css("cursor", "pointer");
        saveButton.on('click', function (e) {
            e.preventDefault();
            let id = $(this).attr('id');
            let editedTitle = $(this).prev().prev().val();
            let editedRating = $(this).prev().val();
            console.log("EDITED RATING: " + editedRating);
            //activate click listener for save button

            editMovieToJSON(id, editedTitle, editedRating);

        });
    }

    $("#notflix-icon").click(() => {
        renderLoading();
        displayMoviesFromJSON();
    });

});