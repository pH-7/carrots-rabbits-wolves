import { WORLD } from '../constants.js'

class World {
  constructor() {
    this.animals = []
    this.carrots = []
    this.width = WORLD.width
    this.height = WORLD.height
  }

  arePositionsIdentical(positionA, positionB) {
    return (
      positionA.horizontal === positionB.horizontal &&
      positionA.vertical === positionB.vertical
    )
  }

  getPosition(element, position) {
    return element.filter(element =>
      this.arePositionsIdentical(element.position, position)
    )
  }

  getDistance(positionA, positionB) {
    return (
      Math.abs(positionA.horizontal - positionB.horizontal) +
      Math.abs(positionA.vertical - positionB.vertical)
    )
  }

  generateMapPositions(width, height) {
    const map = []

    for (let horizontal = 0; horizontal < width; horizontal++) {
      for (let vertical = 0; vertical < height; vertical++) {
        map.push({ horizontal, vertical })
      }
    }
    return map
  }

  getAnimalByType(type) {
    return this.animals.filter(animal => {
      return animal.constructor.name === type
    })
  }

  getAnimals() {
    return this.animals
  }

  getCarrots() {
    return this.carrots
  }

  getLivingThings() {
    return [...this.animals, ...this.carrots]
  }
}

export default World
