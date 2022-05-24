import {
  SCRIPT_CHARSET,
  LIVING_THINGS,
  INTERVAL_TIMEOUT_MS,
} from "./constants.js";
import WorldStimulation from "./worldStimulation.js";
import fs from "fs";
import os from "os";
import path from "path";

export const RESULT_FILENAME = "results.txt";

const worldStimulation = new WorldStimulation();
const updateFile = (pathFile, data) => {
  try {
    fs.appendFileSync(pathFile, data + os.EOL, { encoding: SCRIPT_CHARSET });
  } catch (err) {
    new Error(
      `An error while updating ${pathFile} has occurred. ${err.message}`
    );
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

// Starting the stimulation
const pathFile = path.resolve(path.dirname("")) + "/" + RESULT_FILENAME;
console.info(`Stimulation results will be generated in ${pathFile}`);

// Wait for one second before starting the world stimulation
await new Promise(resolve => setTimeout(resolve, 1000));

try {
  setInterval(() => {
    // Generate the txt stimulation-results file
    generateTxtStats(worldStimulation, pathFile);

    worldStimulation.update();
    // Output the result
    console.log(worldStimulation.generateEmojiGraph());
  }, INTERVAL_TIMEOUT_MS);
} catch (err) {
  console.error(err);
}
