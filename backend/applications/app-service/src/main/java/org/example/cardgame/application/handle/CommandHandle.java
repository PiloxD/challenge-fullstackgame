package org.example.cardgame.application.handle;

import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import org.example.cardgame.domain.command.CrearJuegoCommand;
import org.example.cardgame.domain.command.IniciarJuegoCommand;
import org.example.cardgame.domain.command.IniciarRondaCommand;
import org.example.cardgame.domain.command.PonerCartaEnTablero;
import org.example.cardgame.usecase.usecase.CrearJuegoUseCase;
import org.example.cardgame.usecase.usecase.IniciarJuegoUseCase;
import org.example.cardgame.usecase.usecase.IniciarRondaUseCase;
import org.example.cardgame.usecase.usecase.PonerCartaEnTableroUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class CommandHandle {
    private final IntegrationHandle integrationHandle;

    public CommandHandle(IntegrationHandle integrationHandle) {
        this.integrationHandle = integrationHandle;
    }

    @Bean
    public RouterFunction<ServerResponse> crear(CrearJuegoUseCase usecase) {

        return route(
                POST("/juego/crear").and(accept(MediaType.APPLICATION_JSON)),
                request -> usecase.andThen(integrationHandle)
                        .apply(request.bodyToMono(CrearJuegoCommand.class))
                        .then(ServerResponse.ok().build())

        );
    }

    @Bean
    public RouterFunction<ServerResponse> iniciarJuego(IniciarJuegoUseCase useCase){
        return route(POST("/juego/iniciar").and(accept(MediaType.APPLICATION_JSON)),
                serverRequest -> useCase.andThen(integrationHandle)
                        .apply(serverRequest.bodyToMono(IniciarJuegoCommand.class))
                        .then(ServerResponse.ok().build()));
    }


    @Bean
    public RouterFunction<ServerResponse> poner(PonerCartaEnTableroUseCase usecase) {
        return route(
                POST("/juego/poner").and(accept(MediaType.APPLICATION_JSON)),
                request -> usecase.andThen(integrationHandle)
                        .apply(request.bodyToMono(PonerCartaEnTablero.class))
                        .then(ServerResponse.ok().build())

        );
    }


    @Bean
    public RouterFunction<ServerResponse> iniciarRonda(IniciarRondaUseCase usecase) {
        return route(
                POST("/juego/ronda/iniciar").and(accept(MediaType.APPLICATION_JSON)),
                request -> usecase.andThen(integrationHandle)
                        .apply(request.bodyToMono(IniciarRondaCommand.class))
                        .then(ServerResponse.ok().build())

        );
    }


}