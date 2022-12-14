package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.command.IniciarRondaCommand;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class
IniciarRondaUseCase extends UseCaseForCommand<IniciarRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public IniciarRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<IniciarRondaCommand> iniciarRondaCommand) {
        return iniciarRondaCommand.flatMapMany(comando -> repository.obtenerEventosPor(
                comando.getJuegoId()).collectList().flatMapIterable(evento -> {
            var juego = Juego.from(JuegoId.of(comando.getJuegoId()), evento);
            juego.iniciarRonda();
            return juego.getUncommittedChanges();
        }));
    }
}