export const FIRST_INPUT_COMMENT =
  '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n';
export const SECOND_INPUT_COMMENT = '시도할 횟수는 몇 회인가요?\n';

export const RESULT_OUTPUT_COMMENT = '실행 결과';
export const WINNER_OUTPUT_COMMENT = '최종 우승자 : ';

export const BLANK = '';

export const ERROR_PREFIX = '[ERROR]';
export const INVALID_FORMAT_ERROR = '[ERROR] 입력 형식이 올바르지 않습니다.';
export const INVALID_NAME_COUNT_ERROR = `${ERROR_PREFIX} 자동차 이름은 1자 이상, 5자 이하만 가능합니다.`;
export const INVALID_NAME_ERROR = `${ERROR_PREFIX} 자동차 이름은 한글,영어 숫자만 가능합니다.`;
export const INVALID_COUNT_ERROR = `${ERROR_PREFIX} 시도할 횟수는 양의 정수여야 합니다.`;
export const EMPTY_INPUT_ERROR = `${ERROR_PREFIX} 입력값이 비어있습니다.`;

export const NUMBER_PATTERN = /^[1-9]\d*$/;
export const ENGLISH_KOREAN_PATTERN = '^[0-9a-zA-Zㄱ-ㅎ가-힣]*$';
export const DEFAULT_INPUT_PATTERN = '^[0-9a-zA-Zㄱ-ㅎ가-힣]+(,[0-9a-zA-Zㄱ-ㅎ가-힣]+)*$';
