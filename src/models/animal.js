import { ANIMALS, WORLD } from '../constants.js';
import { Food } from './food.js';
import randomInteger from 'random-int';

export class Animal extends Food {
  constructor(world, position) {
    super(position);

    this.living = true;
    this.healthScore = ANIMALS.maxHealthScore;
    this.world = world;
  }

  die() {
    this.living = false;
  }

  isLiving() {
    return this.living;
  }

  decrementHealth() {
    if (this.healthScore >= 0) {
      this.healthScore--;
    } else {
      this.die();
    }
  }

  healthCheck() {
    if (this.healthScore >= ANIMALS.maxHealthScore) {
      this.healthScore = ANIMALS.maxHealthScore;
    } else if (this.healthScore <= 0) {
      this.die();
    }
  }

  canBeReproduced() {
    return this.healthScore >= ANIMALS.maxHealthScore;
  }

  moveTowards() {
    let newHorizontal = this.position.horizontal;
    let newVertical = this.position.vertical;

    if (this.destination.horizontal > newHorizontal) {
      newHorizontal++;
    } else if (this.destination.horizontal < newHorizontal) {
      newHorizontal--;
    }

    if (this.destination.vertical > newVertical) {
      newVertical++;
    } else if (this.destination.vertical < newVertical) {
      newVertical--;
    }

    const arePositionsNotIdentical = !this.world.arePositionsIdentical(this.position, {
      horizontal: newHorizontal,
      vertical: newVertical,
    });
    if (arePositionsNotIdentical) {
      const randomlyTrue = randomInteger(0, 1) === 0;
      randomlyTrue ? (this.position.horizontal = newHorizontal) : (this.position.vertical = newVertical);
    } else {
      this.position.horizontal = newHorizontal;
      this.position.vertical = newVertical;
    }
  }

  setToNewPlace() {
    const amendPosition = this.position;

    let worldSide = randomInteger(1, 4); // The "world map" has 4 sides :)

    if (worldSide === 1) {
      if (
        this.isValidPosition(amendPosition, {
          horizontal: amendPosition.horizontal + 1,
        })
      ) {
        amendPosition.horizontal++;
      }
      worldSide++;
    }

    if (worldSide === 2) {
      if (
        this.isValidPosition(amendPosition, {
          horizontal: amendPosition.horizontal - 1,
        })
      ) {
        amendPosition.horizontal--;
      }
      worldSide++;
    }

    if (worldSide === 3) {
      if (
        this.isValidPosition(amendPosition, {
          vertical: amendPosition.vertical + 1,
        })
      ) {
        amendPosition.vertical++;
      }
      worldSide++;
    }

    if (worldSide === 4) {
      if (
        this.isValidPosition(amendPosition, {
          vertical: amendPosition.vertical - 1,
        })
      ) {
        amendPosition.vertical--;
      }
    }

    this.position = amendPosition;
  }

  isValidPosition(currentPosition, newPosition) {
    const position = { ...currentPosition, ...newPosition };

    if (position.horizontal < 0 || position.horizontal >= WORLD.width) {
      return false;
    }

    if (position.vertical < 0 || position.vertical >= WORLD.height) {
      return false;
    }

    return true;
  }
}
