package org.example.cardgame.application.handle.model;

import java.util.Map;
import lombok.Data;

@Data
public class JuegoListViewModel {
    private String id;
    private Boolean iniciado;
    private Boolean finalizado;
    private String jugadorPrincipalId;
    private Integer cantidadJugadores;
    private Map<String, Jugador> jugadores;
    private Jugador ganador;


    @Data
    public static class Jugador {
        private String alias;
        private String jugadorId;

    }
}