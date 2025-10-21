import { Console } from '@woowacourse/mission-utils';

class InputHandler {
  static async read(comment) {
    return await Console.readLineAsync(comment);
  }
}

export default InputHandler;
