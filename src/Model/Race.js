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
      this.#cars.forEach((car) => {
        const randomNumber = RandomNumberGenerator.generate();
        car.move(randomNumber);

        const convertResult = ReplaceObjectString.convert(car.getNameDistanceObject());
        OutputHandler.print(convertResult);
      });
      OutputHandler.print(BLANK);
      this.#round += 1;
    }
  }

  calculateWinner() {
    const eachCarDistance = this.#cars.map((car) => {
      return car.getDistance();
    });
    const maxDistance = Math.max(...eachCarDistance); // 30
    let winners = '';
    this.#cars.map((car) => {
      if (car.getDistance() === maxDistance) {
        const carData = car.getNameDistanceObject();
        const convertCarData = ReplaceObjectString.replace(carData);
        winners = winners.concat(`${convertCarData[0]}, `);
        return convertCarData[0];
      }
    });
    const result = winners.slice(0, -2);
    return result;
  }

  set winner(winner) {
    this.#winner = winner;
  }

  get winner() {
    return this.#winner;
  }
}
