package org.example.cardgame.application.handle.materialize;

import co.com.sofka.domain.generic.DomainEvent;
import co.com.sofka.domain.generic.Identity;
import java.time.Instant;
import java.util.HashMap;
import java.util.stream.Collectors;
import org.bson.Document;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Configuration
public class BoardMaterializeHandle {

    private static final String COLLECTION_GAME_VIEW = "gameview";

    private static final String COLLECTION_BOARD_VIEW = "tableroview";

    private final ReactiveMongoTemplate template;

    public BoardMaterializeHandle(ReactiveMongoTemplate template) {
        this.template = template;
    }

    @EventListener
    public void handleTableroCreado(TableroCreado event) {
        var boardView = new Update();
        var update = new Update();


        boardView.set("jugadoresIniciales", event.getJugadorIds().stream()
                .map(Identity::value)
                .collect(Collectors.toList()));
        boardView.set("fecha", Instant.now());
        boardView.set("ronda", new HashMap<>());
        boardView.set("cantidadJugadores", event.getJugadorIds().size());
        update.set("iniciado", true);
        update.set("tablero", boardView);
        template.updateFirst(getFilterByAggregateId(event), update, COLLECTION_GAME_VIEW)
                .block();
        template.updateFirst(getBoardViewByAggregateId(event),boardView, COLLECTION_BOARD_VIEW).block();
    }


    @EventListener
    public void handleRondaCreada(RondaCreada event) {
        var gameView = new Update();
        var boardView = new Update();
        var ronda = event.getRonda().value();
        var document = new Document();
        var jugadores = ronda.jugadores().stream()
                .map(Identity::value)
                .collect(Collectors.toList());

        document.put("jugadores", jugadores);
        document.put("numero", ronda.numero());
        document.put("iniciada", false);
        document.put("estaIniciada", event.getRonda().value().estaIniciada());
        document.put("tiempo",event.getTiempo());

        gameView.set("fecha", Instant.now());
        gameView.set("tiempo", event.getTiempo());
        gameView.set("ronda", document);
        gameView.set("tablero.ronda", document);
        boardView.set("ronda", document);

        template.updateFirst(getFilterByAggregateId(event), gameView, COLLECTION_GAME_VIEW).block();
        template.updateFirst(getBoardViewByAggregateId(event), boardView, COLLECTION_BOARD_VIEW)
                .block();


    }

    private Query getFilterByAggregateId(DomainEvent event) {
        return new Query(
                Criteria.where("_id").is(event.aggregateRootId())
        );
    }

    private Query getBoardViewByAggregateId(DomainEvent event) {
        return new Query(
                Criteria.where("_id").is(event.aggregateRootId())
        );
    }
}