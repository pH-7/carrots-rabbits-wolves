import { CARROTS_QUANTITY } from '../constants.js';
import { Food } from './food.js';

export class Carrot extends Food {
  constructor(startPosition) {
    super(startPosition);

    this.quantity = CARROTS_QUANTITY;
  }

  eaten() {
    this.quantity--;
  }

  isInStock() {
    return this.quantity > 0;
  }

  getRemainingQuantity() {
    return this.quantity;
  }
}
