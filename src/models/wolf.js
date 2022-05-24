import { LIVING_THINGS, MAX_HEALTH_SCORE } from "../constants.js";
import Animal from "./animal.js";

class Wolf extends Animal {
  constructor(world, initialPosition) {
    super(world, initialPosition);
  }

  increaseHealth() {
    if (this.healthScore < MAX_HEALTH_SCORE) {
      this.healthScore += 1;
    } else {
      this.newWolf(this.world);
    }
  }

  newWolf() {
    const wolf = new Wolf(this.world, {
      horizontal: this.position.horizontal,
      vertical: this.position.vertical,
    });
    wolf.setToNewHomePlace();
    return wolf;
  }

  eat(rabbit) {
    if (rabbit instanceof Animal) {
      rabbit.die();
      this.increaseHealth();
    } else {
      console.warn("Wrong food given.");
    }
  }

  update() {
    this.healthCheck();

    if (!this.isLiving) {
      return;
    }

    this.seekRabbitNearby();
  }

  // Retrieve the nearby rabbits nearby
  seekRabbitNearby() {
    const initialValues = { distance: null, rabbit: null };
    const reducer = (nearbyRabbit, rabbit) => {
      const distance = this.world.getDistance(this.position, rabbit.position);
      if (!nearbyRabbit.rabbit || distance < nearbyRabbit.distance) {
        return {
          distance,
          rabbit,
        };
      }
      return nearbyRabbit;
    };

    const nearby = this.world
      .getAnimal(LIVING_THINGS.rabbit)
      .reduce(reducer, initialValues);

    if (nearby.rabbit) {
      this.destination = nearby.rabbit.position;
      this.chasingTowards();
    } else {
      this.setToNewHomePlace();
    }

    const hasRabbitBeenEaten = () => {
      nearby.rabbit &&
        nearby.rabbit.isLiving &&
        this.world.arePositionsIdentical(this.position, nearby.rabbit.position);
    };

    if (hasRabbitBeenEaten()) {
      this.eat(nearby.rabbit);
    } else {
      this.decrementHealth();
    }
  }
}

export default Wolf;
