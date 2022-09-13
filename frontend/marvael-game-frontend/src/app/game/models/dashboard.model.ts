export interface Board {
  round: Round;
  playerQuantity: number;
  initPlayers: string[];
}

export interface Round {
  time: number;
  players: string[];
  number: string;
  isInit: boolean;
}
