import RandomNumberGenerator from '../Util/randomNumberGenerator.js';
import Car from './Car.js';
import OutputHandler from '../view/outputHandler.js';
import ReplaceObjectString from '../Util/replaceObjectString.js';
import { BLANK } from '../Util/constants.js';

export default class Race {
  #round = 0;
  #winner;
  #cars = [];

  constructor(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
  }

  play(playCount) {
    while (this.#round < playCount) {
      this.#cars.forEach((car) => this.#playCar(car));
      OutputHandler.print(BLANK);
      this.#round += 1;
    }
  }

  #playCar(car) {
    const randomNumber = RandomNumberGenerator.generate();
    car.move(randomNumber);

    const convertResult = ReplaceObjectString.convert(car.getNameDistanceObject());
    OutputHandler.print(convertResult);
  }

  calculateWinner() {
    const maxDistance = this.#getMaxDistance();
    return this.#getWinnersByDistance(maxDistance);
  }

  #getMaxDistance() {
    return Math.max(...this.#cars.map((car) => car.getDistance()));
  }

  #getWinnersByDistance(maxDistance) {
    const winners = this.#cars
      .filter((car) => car.getDistance() === maxDistance)
      .map((car) => ReplaceObjectString.replace(car.getNameDistanceObject())[0]);
    return winners.join(', ');
  }

  set winner(winner) {
    this.#winner = winner;
  }

  get winner() {
    return this.#winner;
  }
}
