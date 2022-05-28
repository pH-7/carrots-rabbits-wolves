import { LIVING_THINGS, ANIMALS } from '../constants.js';
import Animal from './animal.js';

class Wolf extends Animal {
  constructor(world, initialPosition) {
    super(world, initialPosition);
  }

  increaseHealth() {
    if (this.healthScore < ANIMALS.maxHealthScore) {
      this.healthScore += 2; // Increment health score by 2
    } else {
      this.newWolf(this.world);
    }
  }

  newWolf() {
    const wolf = new Wolf(this.world, {
      horizontal: this.position.horizontal,
      vertical: this.position.vertical,
    });
    wolf.setToNewPlace();
    return wolf;
  }

  eat(rabbit) {
    if (rabbit instanceof Animal) {
      rabbit.die();
      this.increaseHealth();
    } else {
      console.warn('Wrong food given.');
    }
  }

  chase() {
    this.healthCheck();

    if (!this.isLiving()) {
      return;
    }

    this.seekNearbyRabbits();
  }

  // Retrieve the nearby rabbits nearby
  seekNearbyRabbits() {
    const initialValues = { distance: null, rabbit: null };
    const reducer = (nearby, rabbit) => {
      const distance = this.world.getDistance(this.position, rabbit.position);
      if (!nearby.rabbit || distance < nearby.distance) {
        return {
          distance,
          rabbit,
        };
      }
      return nearby;
    };

    const nearbyRabbit = this.world
      .getAnimalByType(LIVING_THINGS.rabbit)
      .reduce(reducer, initialValues)?.rabbit;

    if (nearbyRabbit) {
      this.destination = nearbyRabbit.position;
      this.moveTowards();
    } else {
      this.setToNewPlace();
    }

    const hasRabbitBeenEaten = () =>
      nearbyRabbit?.isLiving() &&
      this.world.arePositionsIdentical(this.position, nearbyRabbit.position);

    if (hasRabbitBeenEaten()) {
      this.eat(nearbyRabbit);
    } else {
      this.decrementHealth();
    }
  }
}

export default Wolf;
