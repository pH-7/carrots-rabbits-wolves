import { WORLD } from '../constants.js';

export class Food {
  constructor(position = { horizontal: WORLD.firstTile, vertical: WORLD.firstTile }) {
    this.position = position;
    this.destination = [];
  }
}
