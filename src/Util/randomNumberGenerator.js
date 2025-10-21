import { MissionUtils } from '@woowacourse/mission-utils';

export default class RandomNumberGenerator {
  static generate() {
    return MissionUtils.Random.pickNumberInRange(0, 9);
  }
}
