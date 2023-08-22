import { WorldSimulation } from '../worldSimulation.js';
import test from 'ava';

test.beforeEach((t) => {
  t.context.worldSimulation = new WorldSimulation();
});

test('must be able to get carrots', (t) => {
  const actual = t.context.worldSimulation.getCarrots();

  t.true(actual.length > 0);
});

test('must be able to get animals', (t) => {
  const actual = t.context.worldSimulation.getAnimals();

  t.true(actual.length > 0);
});

test('must generate the current living world', (t) => {
  const actual = t.context.worldSimulation.generateEmojiGraph();

  t.not(actual, '');
});
