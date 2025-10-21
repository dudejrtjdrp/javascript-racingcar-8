import { Console } from '@woowacourse/mission-utils';

class InputHandler {
  static async read() {
    return await Console.readLineAsync();
  }
}

export default InputHandler;
