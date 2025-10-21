export default class Car {
  #name;
  #distance = 0;

  constructor(name) {
    this.#name = name;
  }

  move(randomNumber) {
    if (randomNumber >= 4) {
      this.#distance += 1;
    }
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }

  getNameDistanceObject() {
    const nameDistanceObject = {
      [this.#name]: this.#distance,
    };
    return nameDistanceObject;
  }
}
