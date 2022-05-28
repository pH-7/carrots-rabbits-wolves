import Rabbit from "../rabbit.js";
import World from "../world.js";
import test from "ava";

test.beforeEach((t) => {
  const world = new World();
  t.context.rabbit = new Rabbit(world);
});

test("rabbit must be able to reproduce themself by default", (t) => {
  t.true(t.context.rabbit.canBeReproduced());
});

test("rabbit doesn't have barriers in front of them", (t) => {
  const size = { horizontal: 30, vertical: 40 };
  t.true(t.context.rabbit.noBarriers(size, size));
});

test("set to new home-place must changes the position", (t) => {
  const currentHorizontalPosition = t.context.rabbit.position.horizontal;
  const currentVerticalPosition = t.context.rabbit.position.vertical;

  t.context.rabbit.chase();
  t.context.rabbit.setToNewPlace();

  t.is(currentHorizontalPosition, t.context.rabbit.position.horizontal);
  t.is(currentVerticalPosition, t.context.rabbit.position.vertical);
});
