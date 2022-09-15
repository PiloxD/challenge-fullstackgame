package org.example.cardgame.application.handle.materialize;

import java.time.Instant;
import org.bson.Document;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

@Configuration
public class MazoMaterializeHandle {

    private static final String COLLECTION_VIEW = "mazoview";

    private final ReactiveMongoTemplate template;

    public MazoMaterializeHandle(ReactiveMongoTemplate template) {
        this.template = template;
    }


    @EventListener
    public void handleJugadorAgregado(JugadorAgregado event) {
        var mazo = event.getMazo();
        var data = new Document();
        var cartas = mazo.value().cartas();
        data.put("juegoId", event.aggregateRootId());
        data.put("cantidad", event.getMazo().value().cantidad());
        data.put("fecha", Instant.now());
        data.put("jugadorId", event.getJugadorId().value());

        data.put("cartas", cartas);
        template.save(data, COLLECTION_VIEW).block();
    }

}