package org.example.cardgame.domain.command;

import co.com.sofka.domain.generic.Command;

import java.util.Set;

public class CrearRondaCommand extends Command {
    private String juegoId;
    private Integer tiempo;
    private Set<String> jugadores;

    public CrearRondaCommand(String juegoId,Set<String> jugadores) {
        this.juegoId = juegoId;
        this.tiempo = tiempo;
        this.jugadores = jugadores;
    }

    public CrearRondaCommand() {
    }

    public Set<String> getJugadores() {
        return jugadores;
    }

    public void setJugadores(Set<String> jugadores) {
        this.jugadores = jugadores;
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    public Integer getTiempo() {
        return tiempo;
    }
}