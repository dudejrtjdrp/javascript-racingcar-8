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
    this.#validateEmpty(carNamesString);
    this.#validateFormat(carNamesString);

    const carNamesArray = carNamesString.split(',');
    carNamesArray.forEach((carName) => this.#validateCarName(carName));
  }

  static #validateEmpty(carNamesString) {
    if (!carNamesString) throw new Error(EMPTY_INPUT_ERROR);
  }

  static #validateFormat(carNamesString) {
    if (!carNamesString.match(DEFAULT_INPUT_PATTERN)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
  }

  static #validateCarName(carName) {
    this.#validateCarNameLength(carName);
    this.#validateCarNameLetter(carName);
  }

  static #validateCarNameLength(carName) {
    const invalidLength = carName.length <= 0 || carName.length > 5;
    if (invalidLength) throw new Error(INVALID_NAME_COUNT_ERROR);
  }

  static #validateCarNameLetter(carName) {
    if (!carName.match(ENGLISH_KOREAN_PATTERN)) {
      throw new Error(INVALID_NAME_ERROR);
    }
  }

  static secondInput(roundCount) {
    const isPositiveNumber = NUMBER_PATTERN.test(roundCount);
    if (!isPositiveNumber) {
      throw new Error(INVALID_COUNT_ERROR);
    }
  }
}
