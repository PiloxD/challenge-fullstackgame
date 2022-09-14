import { Card } from "./card.model";


export interface List {
  cantidad: number;
  cartas: Card[];
  juegoId: string;
  jugadorId: string;
}
