import InputHandler from '../view/inputHandler.js';
import {
  FIRST_INPUT_COMMENT,
  SECOND_INPUT_COMMENT,
  RESULT_OUTPUT_COMMENT,
  WINNER_OUTPUT_COMMENT,
  BLANK,
} from '../Util/constants.js';
import OutputHandler from '../view/outputHandler.js';
import Race from '../Model/Race.js';
import Validation from '../Util/validation.js';

export default class RaceController {
  static async playRace() {
    try {
      const firstInput = await InputHandler.read(FIRST_INPUT_COMMENT);
      Validation.firstInput(firstInput);

      await this.#handleSecondInput(firstInput);
    } catch (error) {
      OutputHandler.printError(error);
      throw error;
    }
  }

  static async #handleSecondInput(firstInput) {
    const secondInput = await InputHandler.read(SECOND_INPUT_COMMENT);
    Validation.secondInput(secondInput);

    OutputHandler.print(BLANK);
    OutputHandler.print(RESULT_OUTPUT_COMMENT);

    const carNames = firstInput.split(',');
    const newRace = new Race(carNames);
    newRace.play(secondInput);

    const result = newRace.calculateWinner();
    OutputHandler.print(`${WINNER_OUTPUT_COMMENT}${result}`);
  }
}
