import { LIVING_THINGS, WORLD } from './constants.js'
import Animal from './models/animal.js'
import Carrot from './models/carrot.js'
import Rabbit from './models/rabbit.js'
import Wolf from './models/wolf.js'
import World from './models/world.js'
import arrayShuffle from 'array-shuffle'
import randomInteger from 'random-int'

class WorldSimulation extends World {
  constructor() {
    super()

    this.createRabbits()
    this.createWolves()
    this.growCarrots()
  }

  growCarrots() {
    const map = this.getWorld()

    for (let horizontal = 0; horizontal < WORLD.width; horizontal++) {
      for (let vertical = 0; vertical < WORLD.height; vertical++) {
        if (!map[horizontal][vertical].length) {
          const foodFrequency =
            randomInteger(0, WORLD.foodDensity) === WORLD.foodDensity
          if (foodFrequency) {
            this.carrots.push(new Carrot({ horizontal, vertical }))
          }
        }
      }
    }
  }

  createWolves() {
    const possiblePositions = arrayShuffle(
      this.generateMapPositions(WORLD.width, WORLD.height)
    )

    const position = possiblePositions.slice(
      0,
      randomInteger(1, WORLD.maxTiles)
    )
    const endPosition = randomInteger(WORLD.maxTiles - 20, WORLD.maxTiles)

    for (let tile = 0; tile < endPosition; tile++) {
      this.animals.push(new Wolf(this, position[tile]))
    }
  }

  createRabbits() {
    const possiblePositions = arrayShuffle(
      this.generateMapPositions(WORLD.width, WORLD.height)
    )

    const position = possiblePositions.slice(
      0,
      randomInteger(1, WORLD.maxTiles)
    )
    const endPosition = randomInteger(WORLD.maxTiles - 20, WORLD.maxTiles)

    for (let tile = 0; tile < endPosition; tile++) {
      this.animals.push(new Rabbit(this, position[tile]))
    }
  }

  update() {
    const reproductive = this.animals.filter(animal => animal.canBeReproduced())

    for (let amount = 0; amount < reproductive.length; amount++) {
      if (reproductive[amount].constructor.name === LIVING_THINGS.rabbit) {
        const rabbit = reproductive[amount].newRabbit()
        this.animals.push(rabbit)
      }

      if (reproductive[amount].constructor.name === LIVING_THINGS.wolf) {
        const wolf = reproductive[amount].newWolf()
        this.animals.push(wolf)
      }
    }

    this.growCarrots()

    // Cleanup by excluding the dead animals
    this.animals = this.animals
      .map(animal => {
        animal.chase()
        return animal
      })
      .filter(animal => animal.isLiving())

    this.carrots = this.carrots.filter(carrot => carrot.isInStock())
  }

  generateEmojiGraph() {
    let simulation = ''

    for (let horizontal = 0; horizontal < this.width; horizontal++) {
      for (let vertical = 0; vertical < this.height; vertical++) {
        const carrots = this.getPosition(this.carrots, {
          horizontal,
          vertical,
        })

        const animals = this.getPosition(this.animals, {
          horizontal,
          vertical,
        })

        if (carrots.length) {
          simulation += '🥕'
        } else if (animals.length) {
          const animalType = animals[0].constructor.name

          if (animalType === LIVING_THINGS.rabbit) {
            simulation += '🐰'
          } else if (animalType === LIVING_THINGS.wolf) {
            simulation += '🐺'
          }
        } else {
          simulation += '🌱'
        }
      }
    }

    return simulation
  }

  getWorld() {
    const map = []

    for (let horizontal = 0; horizontal < WORLD.width; horizontal++) {
      map[horizontal] = []
      for (let vertical = 0; vertical < WORLD.height; vertical++) {
        map[horizontal][vertical] = []
      }
    }

    this.animals.forEach(animal => {
      if (animal instanceof Animal) {
        map[animal.position.horizontal][animal.position.vertical].push(animal)
      }
    })

    return map
  }
}

export default WorldSimulation
