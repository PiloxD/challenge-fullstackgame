import { PlayerModel } from './player.model';

export interface GameModel {
  id: string;
  iniciado: boolean;
  finalizado: boolean;
  uid: string;
  cantidadJugadores: number;
  jugadores: { [key: string]: PlayerModel };
  ganador: null;
}
