import { Card } from "./card.model";


export interface List {
  quantity: number;
  cards: Card[];
  gameId: string;
  playerId: string;
}
