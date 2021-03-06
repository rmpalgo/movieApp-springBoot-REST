package com.movieapp.movieapp.model;

import javax.persistence.*;

@Entity
@Table(name= "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column
    private byte rating;

    @Column
    private String poster;

    @Column
    String year;

    public Movie() {
    }

    public Movie(long id, String title, byte rating, String poster, String year) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.poster = poster;
        this.year = year;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte getRating() {
        return rating;
    }

    public void setRating(byte rating) {
        this.rating = rating;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
