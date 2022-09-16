package org.example.cardgame.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Mazo implements ValueObject<Mazo.Props> {

    private final Set<Carta> catas;
    private final Integer cantidad;

    public Mazo(Set<Carta> catas) {
        this.catas = catas;
        this.cantidad = catas.size();
    }

    @Override
    public Props value() {
        return new Props() {
            @Override
            public Set<Carta> cartas() {
                return catas;
            }

            @Override
            public Integer cantidad() {
                return cantidad;
            }
        };
    }

    public Mazo nuevaCarta(Carta carta) {
        var catas = new HashSet<>(this.catas);
        catas.add(carta);
        return new Mazo(catas);
    }

    public Mazo retirarCarta(Carta cartaRetirada) {
        var cartaId =  cartaRetirada.value().cartaId();
        var nuevoMazo = this.catas.stream()
                .filter(carta -> !cartaId.equals(carta.value().cartaId()))
                .collect(Collectors.toCollection(HashSet::new));
        return new Mazo(nuevoMazo);
    }

    public interface Props {
        Set<Carta> cartas();
        Integer cantidad();
    }
}