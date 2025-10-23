import {
  INVALID_FORMAT_ERROR,
  INVALID_NAME_ERROR,
  INVALID_COUNT_ERROR,
  NUMBER_PATTERN,
  ENGLISH_KOREAN_PATTERN,
  INVALID_NAME_COUNT_ERROR,
  DEFAULT_INPUT_PATTERN,
  EMPTY_INPUT_ERROR,
} from './constants.js';

export default class Validation {
  static firstInput(carNamesString) {
    const isEmptyString = !carNamesString;
    if (isEmptyString) {
      throw new Error(EMPTY_INPUT_ERROR);
    }

    const isStringPattern = !carNamesString.match(DEFAULT_INPUT_PATTERN);
    if (isStringPattern) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    const carNamesArray = carNamesString.split(',');
    for (let i = 0; i < carNamesArray.length; i += 1) {
      const carName = carNamesArray[i];

      const isCarNameLength = carName.length <= 0 || carName.length > 5;
      if (isCarNameLength) {
        throw new Error(INVALID_NAME_COUNT_ERROR);
      }

      const isCarNameLetter = !carName.match(ENGLISH_KOREAN_PATTERN);
      if (isCarNameLetter) {
        throw new Error(INVALID_NAME_ERROR);
      }
    }
  }

  static secondInput(roundCount) {
    const isPositiveNumber = NUMBER_PATTERN.test(roundCount);

    if (!isPositiveNumber) {
      throw new Error(INVALID_COUNT_ERROR);
    }
  }
}
