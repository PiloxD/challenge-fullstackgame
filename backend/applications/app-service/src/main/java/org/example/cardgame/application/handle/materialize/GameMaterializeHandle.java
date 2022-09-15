package org.example.cardgame.application.handle.materialize;

import co.com.sofka.domain.generic.DomainEvent;
import co.com.sofka.domain.generic.Identity;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.bson.Document;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Configuration
public class GameMaterializeHandle {

    private static final String COLLECTION_VIEW = "gameview";

    private final ReactiveMongoTemplate template;

    public GameMaterializeHandle(ReactiveMongoTemplate template) {
        this.template = template;
    }

    @EventListener
    public void handleJuegoCreado(JuegoCreado event) {
        var game = new HashMap<>();
        var board = new HashMap<>();
        board.put("jugadorPrincipalId", event.getJugadorPrincipal().value());
        board.put("_id", event.aggregateRootId());

        game.put("_id", event.aggregateRootId());
        game.put("fecha", Instant.now());
        game.put("jugadorPrincipalId", event.getJugadorPrincipal().value());
        game.put("iniciado", false);
        game.put("finalizado", false);
        game.put("cantidadJugadores", 0);
        game.put("jugadores", new HashMap<>());
        template.save(board, "tableroview").block();
        template.save(game, COLLECTION_VIEW).block();
    }

    @EventListener
    public void handleJugadorAgregado(JugadorAgregado event) {
        var data = new Update();
        data.set("fecha", Instant.now());
        data.set("jugadores." + event.getJugadorId().value(), Map.of("jugadorId",event.getJugadorId().value(),"alias",event.getAlias()));
        data.inc("cantidadJugadores");
        template.updateFirst(getFilterByAggregateId(event), data, COLLECTION_VIEW).block();
    }


    private Query getFilterByAggregateId(DomainEvent event) {
        return new Query(
                Criteria.where("_id").is(event.aggregateRootId())
        );
    }

}