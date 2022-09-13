package org.example.cardgame.usecase.usecase;

import co.com.sofka.business.generic.UseCase;
import co.com.sofka.domain.generic.DomainEvent;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.example.cardgame.domain.command.IniciarJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.*;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

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
        var juegoId = JuegoId.of("Juego-001");
        var comando = new IniciarJuegoCommand(juegoId.value());

        when(service.obtenerEventosPor(juegoId.value())).thenReturn(obtenerEventos());

        StepVerifier.create(useCase.apply(Mono.just(comando)))
                .expectNextMatches(eventoDominio -> {
                    var evento = (TableroCreado) eventoDominio;
                    return "Juego-001".equals(evento.aggregateRootId());
                }).expectNextMatches(eventoDominio -> {
                    var evento = (RondaCreada) eventoDominio;
                    return evento.getRonda().value().numero().equals(1) && evento.getTiempo() == 80;
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> obtenerEventos() {

        var cartas = Set.of(
                new Carta(CartaMaestraId.of("cm-001"), 500, false, false),
                new Carta(CartaMaestraId.of("cm-002"), 100, false, false),
                new Carta(CartaMaestraId.of("cm-003"), 200, false, false),
                new Carta(CartaMaestraId.of("cm-004"), 300, false, false),
                new Carta(CartaMaestraId.of("cm-005"), 400, false, false)
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