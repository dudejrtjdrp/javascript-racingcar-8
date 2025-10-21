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
      this.#cars.forEach((car) => {
        const randomNumber = RandomNumberGenerator();
        car.move(randomNumber);
      });
      OutputHandler.print(this.#cars);
      this.#round += 1;
    }
  }

  calculateWinner() {
    this.eachCarDistance = this.#cars.map((car) => {
      car.getDistance();
    });

    const maxDistance = Math.max(...eachCarDistance); // 30
    const winners = this.#cars.filter((car) => car.getDistance() === maxDistance);
    return winners;
  }

  set winner(winner) {
    this.#winner = winner;
  }

  get winner() {
    return this.#winner;
  }
}
