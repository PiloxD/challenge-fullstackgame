package org.example.cardgame.domain.values;

import co.com.sofka.domain.generic.Identity;

public class TableroId extends Identity {

    public TableroId(String tableroId) {
        super(tableroId);
    }

    public TableroId(){

    }

    public static TableroId of(String tableroId) {
        return new TableroId(tableroId);
    }

}