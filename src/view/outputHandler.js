import { Console } from '@woowacourse/mission-utils';
import { ERROR_PREFIX } from '../Util/constants.js';

class OutputHandler {
  static print(result) {
    Console.print(result);
  }

  static printError(error) {
    if (!error) {
      Console.print(ERROR_PREFIX);
    }
    const handleError = error;
    if (!error.message.startsWith(ERROR_PREFIX)) {
      handleError.message = `${ERROR_PREFIX}${error}`;
    }
    Console.print(`${handleError.message}`);
  }
}

export default OutputHandler;
