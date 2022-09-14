export interface Dashboard {
  ronda: Round;
  cantidadJugadores: number;
  jugadoresIniciales: string[];
  jugadorPrincipalId: String
}

export interface Round {
  tiempo: number;
  jugadores: string[];
  numero: string;
  estaIniciada: boolean;
}
