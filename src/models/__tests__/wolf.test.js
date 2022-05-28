import Wolf from "../wolf.js";
import World from "../world.js";
import test from "ava";

test.beforeEach((t) => {
  const world = new World();
  t.context.wolf = new Wolf(world);
});

test("wolf must be able to reproduce themself by default", (t) => {
  t.true(t.context.wolf.canBeReproduced());
});

test("wolf doesn't have barriers in front of them", (t) => {
  const size = { horizontal: 30, vertical: 40 };
  t.true(t.context.wolf.noBarriers(size, size));
});

test("set to new home-place must changes the position", (t) => {
  const currentHorizontalPosition = t.context.wolf.position.horizontal;
  const currentVerticalPosition = t.context.wolf.position.vertical;

  t.context.wolf.chase();
  t.context.wolf.moveTowards();

  t.is(currentHorizontalPosition, t.context.wolf.position.horizontal);
  t.is(currentVerticalPosition, t.context.wolf.position.vertical);
});
