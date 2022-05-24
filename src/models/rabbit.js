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
    rabbit.setToNewPlace();
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
    const reducer = (nearby, carrot) => {
      const distance = this.world.getDistance(this.position, carrot.position);
      if (!nearby.carrot || distance < nearby.distance) {
        return {
          distance,
          carrot,
        };
      }
      return nearby;
    };

    const nearbyCarrot = this.world
      .getCarrots()
      .reduce(reducer, initialValues)?.carrot;

    if (nearbyCarrot) {
      this.destination = nearbyCarrot.position;
      this.chasingTowards();
    } else {
      this.setToNewPlace();
    }

    const hasCarrotBeenEaten = () =>
      nearbyCarrot?.isInStock() &&
      this.world.arePositionsIdentical(this.position, nearbyCarrot.position);

    if (hasCarrotBeenEaten()) {
      this.eat(nearbyCarrot);
    } else {
      this.decrementHealth();
    }
  }
}

export default Rabbit;
