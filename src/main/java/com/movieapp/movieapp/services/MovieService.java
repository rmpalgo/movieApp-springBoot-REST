package com.movieapp.movieapp.services;

import com.movieapp.movieapp.daos.MoviesRepository;
import com.movieapp.movieapp.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private MoviesRepository moviesRepository;

    public MovieService(MoviesRepository moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    //Save One Movie
    public Movie saveMovie(Movie Movie) {
        return moviesRepository.save(Movie);
    }

    //Get All Movies
    public List<Movie> getMovies() {
        return moviesRepository.findAll();
    }

    //Delete Movie
    public String deleteMovie(long id) {
        moviesRepository.deleteById(id);
        return "Movie deleted || " + id;
    }

    //Get Single Movie
    public Movie getMovieById(long id) {
        return moviesRepository.findById(id).orElse(null);
    }

    //update Movie
    public Movie updateMovie(Movie movie) {
        System.out.println("ID" + "  " + movie.getId());
        System.out.println("Title" + "  " + movie.getTitle());
        Movie existingMovie = moviesRepository.getOne(movie.getId());
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setRating(movie.getRating());
        existingMovie.setPoster(movie.getPoster());
        existingMovie.setYear(movie.getYear());
        return moviesRepository.save(existingMovie);
    }

}
