package com.movieapp.movieapp.controllers;

import com.movieapp.movieapp.model.Movie;
import com.movieapp.movieapp.services.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/api/movies")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }

    @GetMapping("/api/movies")
    public List<Movie> getAllMovies() {
        return movieService.getMovies();
    }

    @PutMapping("/api/movies/update")
    public Movie updateProduct(@RequestBody Movie movie) {
        return movieService.updateMovie(movie);
    }

    @DeleteMapping("api/movies/{id}")
    public String deleteMovie(@PathVariable long id) {
        return movieService.deleteMovie(id);
    }

}
