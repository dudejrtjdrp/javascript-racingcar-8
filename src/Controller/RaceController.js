import InputHandler from '../view/inputHandler.js';
import { FIRST_INPUT_COMMENT, SECOND_INPUT_COMMENT } from '../Util/constants.js';
import OutputHandler from '../view/outputHandler.js';
import { Race } from '../Model/Race.js';

export default class RaceController {
  static async playRace() {
    try {
      const firstInput = await InputHandler.read(FIRST_INPUT_COMMENT);

      try {
        const secondInput = await InputHandler.read(SECOND_INPUT_COMMENT);
        const newRace = Race(firstInput);
        newRace.play(secondInput);
        const result = newRace.winner; // 나중에 계산 로직 추가
        OutputHandler.print(result);
      } catch (secondError) {
        OutputHandler.printError(secondError);
        throw secondError;
      }
    } catch (firstError) {
      OutputHandler.printError(firstError);
      throw firstError;
    }
  }
}
