import { CARROTS_QUANTITY } from '../../constants.js';
import { Carrot } from '../carrot.js';
import test from 'ava';

test.beforeEach((t) => {
  t.context.carrot = new Carrot();
});

test('carrot must decrease by 1 when a carrot is eaten', (t) => {
  t.context.carrot.eaten();

  const actual = t.context.carrot.getRemainingQuantity();
  t.is(actual, CARROTS_QUANTITY - 1);
});
