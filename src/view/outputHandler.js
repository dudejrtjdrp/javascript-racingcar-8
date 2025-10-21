import { Console } from '@woowacourse/mission-utils';

class OutputHandler {
  static print(result) {
    Console.print(`${result}`);
  }

  static printError(error) {
    Console.print(`${error}`);
  }
}

export default OutputHandler;
