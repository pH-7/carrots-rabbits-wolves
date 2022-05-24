import { WORLD } from "../constants.js";

class Food {
  constructor(
    position = { horizontal: WORLD.firstTile, vertical: WORLD.firstTile }
  ) {
    this.position = position;
    this.destination = [];
  }
}

export default Food;
