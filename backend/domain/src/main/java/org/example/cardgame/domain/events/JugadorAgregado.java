package org.example.cardgame.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Mazo;

public class JugadorAgregado extends DomainEvent {
    private final JugadorId identity;
    private final String alias;
    private final Mazo mazo;

    public JugadorAgregado(JugadorId identity, String alias, Mazo mazo) {
        super("cardgame.jugadoragregado");
        this.identity = identity;
        this.alias = alias;
        this.mazo = mazo;
    }

    public JugadorId getJugadorId() {
        return identity;
    }

    public String getAlias() {
        return alias;
    }

    public Mazo getMazo() {
        return mazo;
    }
}