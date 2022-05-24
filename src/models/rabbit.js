import { LIVING_THINGS, MAX_HEALTH_SCORE } from "../constants.js";
import Animal from "./animal.js";
import Carrot from "./carrot.js";

class Rabbit extends Animal {
  constructor(world, startPosition) {
    super(world, startPosition);
  }

  increaseHealth() {
    if (this.healthScore < MAX_HEALTH_SCORE) {
      this.healthScore += 1;
    } else {
      this.newRabbit();
    }
  }

  newRabbit() {
    const rabbit = new Rabbit(this.world, {
      horizontal: this.position.horizontal,
      vertical: this.position.vertical,
    });
    rabbit.setToNewHomePlace();
    return rabbit;
  }

  eat(carrot) {
    if (carrot instanceof Carrot) {
      carrot.eaten();
      this.increaseHealth();
    } else {
      console.warn("Wrong given food.");
    }
  }

  update() {
    this.healthCheck();

    if (!this.isLiving) {
      return;
    }

    this.seekCarrotNearby();
  }

  seekCarrotNearby() {
    const initialValues = { distance: null, carrot: null };
    const reducer = (nearbyCarrot, carrot) => {
      const distance = this.world.getDistance(this.position, carrot.position);
      if (!nearbyCarrot.carrot || distance < nearbyCarrot.distance) {
        return {
          distance,
          carrot,
        };
      }
      return nearbyCarrot;
    };

    const nearby = this.world
      .getAnimal(LIVING_THINGS.rabbit)
      .reduce(reducer, initialValues);

    if (nearby.carrot) {
      this.destination = nearby.carrot.position;
      this.chasingTowards();
    } else {
      this.setToNewHomePlace();
    }

    const hasCarrotBeenEaten = () => {
      nearby.carrot &&
        nearby.carrot.isLiving &&
        this.world.arePositionsIdentical(this.position, nearby.carrot.position);
    };

    if (hasCarrotBeenEaten()) {
      this.eat(nearby.carrot);
    } else {
      this.decrementHealth();
    }
  }
}

export default Rabbit;
