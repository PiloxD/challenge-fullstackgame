package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.IniciarJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.CartaMaestraId;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Mazo;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class IniciarJuegoUseCaseTest {

    @Mock
    private JuegoDomainEventRepository service;

    @InjectMocks
    private IniciarJuegoUseCase useCase;

    @Test
    void iniciarJuegoHappyPass() {
        var juegoId = JuegoId.of("u1");
        var comando = new IniciarJuegoCommand(juegoId.value());

        when(service.obtenerEventosPor(juegoId.value())).thenReturn(obtenerEventos());

        StepVerifier.create(useCase.apply(Mono.just(comando)))
                .expectNextMatches(eventoDominio -> {
                    var evento = (TableroCreado) eventoDominio;
                    return "u1".equals(evento.aggregateRootId());
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> obtenerEventos() {

        var cartas = Set.of(
                new Carta(CartaMaestraId.of("s1"), 500, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s2"), 100, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s3"), 200, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s4"), 300, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s5"), 400, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s6"), 400, false, false, "img.jpg"),
                new Carta(CartaMaestraId.of("s7"), 400, false, false, "img.jpg")
        );

        return Flux.just(
                new JuegoCreado(JugadorId.of("JugadorPrincipalId-001")),
                new JugadorAgregado(JugadorId.of("xxxx"), "xxx", new Mazo(cartas.stream().skip(5).collect(
                        Collectors.toSet()))),
                new JugadorAgregado(JugadorId.of("cccc"), "xxx", new Mazo(cartas.stream().skip(5).collect(
                        Collectors.toSet())))
        );
    }

}