import { RandomNumberGenerator } from '../Util/randomNumberGenerator.js';
import Car from './Car.js';
import OutputHandler from '../view/outputHandler.js';

export default class Race {
  #round = 0;
  #winner;
  #cars = [];

  constructor(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
  }

  play(playCount) {
    while (this.#round < playCount) {
      this.#round += 1;
    }
  }

  calculateWinner() {}

  set winner(winner) {
    this.#winner = winner;
  }

  get winner() {
    return this.#winner;
  }
}
