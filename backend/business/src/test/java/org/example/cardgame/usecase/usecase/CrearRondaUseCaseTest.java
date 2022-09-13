package org.example.cardgame.usecase.usecase;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import co.com.sofka.domain.generic.DomainEvent;
import java.util.Set;

import org.example.cardgame.domain.command.CrearRondaCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.TableroId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@ExtendWith(MockitoExtension.class)
class CrearRondaUseCaseTest {

    @InjectMocks
    private CrearRondaUseCase useCase;
    @Mock
    private JuegoDomainEventRepository repository;


    @Test
    void crearRondaHappyPass() {
        var juegoId = JuegoId.of("JuegoId-001");
        var jugadores = Set.of("jugadorid-001", "jugadorId-002");
        var comando = new CrearRondaCommand(juegoId.value(), jugadores);

        when(repository.obtenerEventosPor(juegoId.value())).thenReturn(eventos());

        StepVerifier.create(useCase.apply(Mono.just(comando)))
                .expectNextMatches(eventoDominio ->{
                    var evento = (RondaCreada) eventoDominio;

                    return "JuegoId-001".equals(evento.aggregateRootId());
                })
                .expectComplete()
                .verify();
    }
    private Flux<DomainEvent> eventos() {
        var evento = new JuegoCreado(JugadorId.of("jugadorid-001"));
        var jugadores = Set.of(JugadorId.of("jugadorid-001"), JugadorId.of("jugadorid-002"));
        var evento2 = new TableroCreado(TableroId.of("tableroId-001"),jugadores);
        return Flux.just(
                evento,
                evento2
        );
    }

}