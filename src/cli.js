/*! 2022-2024 Pierre-Henry Soria | https://github.com/pH-7 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { SCRIPT_CHARSET, LIVING_THINGS, INTERVAL_TIMEOUT_MS } from './constants.js';
import { WorldSimulation } from './worldSimulation.js';

export const RESULT_FILENAME = 'results.txt';

const worldSimulation = new WorldSimulation();

const updateFile = (pathFile, data) => {
  try {
    fs.appendFileSync(pathFile, data + os.EOL, { encoding: SCRIPT_CHARSET });
  } catch (err) {
    new Error(`An error while updating ${pathFile} has occurred. ${err.message}`);
  }
};

const generateTxtStats = (world, pathFile) => {
  const initialValues = { wolves: 0, rabbits: 0, carrots: 0 };

  const reducer = (stats, livingThing) => {
    const { name } = livingThing.constructor;

    if (name === LIVING_THINGS.wolf) {
      stats.wolves++;
    } else if (name === LIVING_THINGS.rabbit) {
      stats.rabbits++;
    } else if (name === LIVING_THINGS.carrot) {
      stats.carrots++;
    }

    return stats;
  };
  const results = world.getLivingThings().reduce(reducer, initialValues);

  const testResult = JSON.stringify(results);
  updateFile(pathFile, testResult);
};

// Starting the simulation
const pathFile = path.resolve(path.dirname('')) + '/' + RESULT_FILENAME;
console.info(`Simulation results will be generated in ${pathFile}`);

// Wait for one second before starting the world simulation
await new Promise((resolve) => setTimeout(resolve, 1000));

try {
  setInterval(() => {
    worldSimulation.update();

    // Generate the txt simulation-results file
    generateTxtStats(worldSimulation, pathFile);

    // Output the result
    console.log(worldSimulation.generateEmojiGraph());
  }, INTERVAL_TIMEOUT_MS);
} catch (err) {
  // Console log exception error messages
  console.error(err.message);
}
