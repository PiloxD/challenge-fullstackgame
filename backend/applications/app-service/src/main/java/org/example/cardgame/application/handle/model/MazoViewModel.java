package org.example.cardgame.application.handle.model;

import java.util.Objects;
import java.util.Set;
import lombok.Data;

@Data
public class MazoViewModel {
    private Integer cantidad;
    private Set<Carta> cartas;
    private String juegoId;
    private String jugadorId;
    @Data
    public static class Carta {
        private  String cartaId;
        private  Boolean estaOculta;
        private  Boolean estaHabilitada;
        private  Integer poder;
        private String uri;

        public Carta(String cartaId, Boolean estaOculta, Boolean estaHabilitada, Integer poder,
                     String url) {
            this.cartaId = cartaId;
            this.estaOculta = estaOculta;
            this.estaHabilitada = estaHabilitada;
            this.poder = poder;
            this.uri = uri;
        }

        public Carta() {
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Carta carta = (Carta) o;
            return Objects.equals(cartaId, carta.cartaId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(cartaId);
        }
    }
}