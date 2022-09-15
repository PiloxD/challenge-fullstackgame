package org.example.cardgame.application.handle.model;

import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Data;

@Data
public class TableroViewModel {


    private Ronda ronda;
    private Integer cantidadJugadores;
    private Set<String> jugadoresIniciales;
    private String jugadorPrincipalId;
    private Map<String, List<MazoViewModel.Carta>> cartas;


    @Data
    public static class Ronda {
        private Integer tiempo;
        private Set<String> jugadores;
        private String numero;
        private Boolean estaIniciada;

    }

}
