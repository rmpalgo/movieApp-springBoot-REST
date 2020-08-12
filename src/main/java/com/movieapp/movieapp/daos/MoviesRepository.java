package com.movieapp.movieapp.daos;

import com.movieapp.movieapp.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepository extends JpaRepository<Movie, Long> {

}
