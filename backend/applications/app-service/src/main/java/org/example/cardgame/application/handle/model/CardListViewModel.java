package org.example.cardgame.application.handle.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document
public class CardListViewModel {
    private Integer id;
    private String nombre;
    private String uri;
    private Integer poder;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public Integer getPoder() {
        return poder;
    }

    public void setPoder(Integer poder) {
        this.poder = poder;
    }
}