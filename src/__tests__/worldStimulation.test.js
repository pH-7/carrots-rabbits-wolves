import WorldStimulation from "../worldStimulation.js";
import test from "ava";

test.beforeEach((t) => {
  t.context.worldStimulation = new WorldStimulation();
});

test("must be able to get carrots", (t) => {
  const actual = t.context.worldStimulation.getCarrots();

  t.true(actual.length > 0);
});

test("must be able to get animals", (t) => {
  const actual = t.context.worldStimulation.getAnimals();

  t.true(actual.length > 0);
});

// test("must be able to generate the current living world", (t) => {
//   const actual = t.context.world.simulate();
//
//   t.is(actual, "");
// });
