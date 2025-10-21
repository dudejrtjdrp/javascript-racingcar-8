import InputHandler from '../view/inputHandler.js';
import { ERROR_PREFIX, FIRST_INPUT_COMMENT, SECOND_INPUT_COMMENT } from '../Util/constants.js';
import OutputHandler from '../view/outputHandler.js';

export default class RaceController {
  static async playRace() {
    try {
      const firstInput = await InputHandler.read(FIRST_INPUT_COMMENT);
      try {
        const secondInput = await InputHandler.read(SECOND_INPUT_COMMENT);
        const result = '';
        OutputHandler.print(result);
      } catch (error) {
        OutputHandler.printError(error);
        throw error;
      }
    } catch (error) {
      OutputHandler.printError(error);
      throw error;
    }
  }
}
