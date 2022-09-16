package org.example.cardgame.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.Objects;

/**
 * The type Carta.
 */
public class Carta implements ValueObject<Carta.Props>, Comparable<Carta> {

    private final CartaMaestraId cartaId;
    private final Boolean estaOculta;
    private final Boolean estaHabilitada;
    private final Integer poder;
    private final String imagen;


    public Carta(CartaMaestraId cartaId, Integer poder, Boolean estaOculta, Boolean estaHabilitada, String imagen) {
        this.cartaId = cartaId;
        this.estaOculta = estaOculta;
        this.estaHabilitada = estaHabilitada;
        this.poder = poder;
        this.imagen = imagen;
    }

    @Override
    public Props value() {
        return new Props() {
            @Override
            public CartaMaestraId cartaId() {
                return cartaId;
            }

            @Override
            public Integer poder() {
                return poder;
            }

            @Override
            public Boolean estaOculta() {
                return estaOculta;
            }

            @Override
            public Boolean estaHabilitada() {
                return estaHabilitada;
            }

            @Override
            public String imagen() {
                return imagen;
            }
        };
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Carta carta = (Carta) o;
        return Objects.equals(cartaId, carta.cartaId) && Objects.equals(estaOculta, carta.estaOculta) && Objects.equals(estaHabilitada, carta.estaHabilitada) && Objects.equals(poder, carta.poder) && Objects.equals(imagen, carta.imagen);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartaId, estaOculta, estaHabilitada, poder, imagen);
    }

    @Override
    public int compareTo(Carta carta) {
        return  this.poder - carta.poder;
    }


    public interface Props {
        CartaMaestraId cartaId();
        Integer poder();
        Boolean estaOculta();
        Boolean estaHabilitada();
        String imagen();
    }
}