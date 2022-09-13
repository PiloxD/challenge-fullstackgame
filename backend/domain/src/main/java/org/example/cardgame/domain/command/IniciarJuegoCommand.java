package org.example.cardgame.domain.command;

import co.com.sofka.domain.generic.Command;

public class IniciarJuegoCommand extends Command {
    private String juegoId;

    public IniciarJuegoCommand(String juegoId) {
        this.juegoId = juegoId;
    }

    public IniciarJuegoCommand() {
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}