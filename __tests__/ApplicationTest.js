import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '12'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('기능 테스트 - 공동 우승자', async () => {
    // given
    const MOVING_FORWARD = 4;
    const inputs = ['pobi,woni,jun', '1'];
    const logs = ['pobi : -', 'woni : -', 'jun : -', '최종 우승자 : pobi, woni, jun'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('기능 테스트 - 여러 라운드 진행', async () => {
    // given
    const inputs = ['pobi,woni', '5'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 4, 5, 3, 6, 4, 7, 2, 8, 1]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자'));
  });

  test('기능 테스트 - 자동차 1대', async () => {
    // given
    const inputs = ['pobi', '3'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 5, 6]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자 : pobi'));
  });

  test('기능 테스트 - 모두 전진하지 못한 경우', async () => {
    // given
    const inputs = ['pobi,woni', '2'];
    const logs = ['pobi : ', 'woni : '];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([3, 2, 1, 0]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('기능 테스트 - 경계값 테스트 (랜덤값 4)', async () => {
    // given
    const inputs = ['pobi,woni', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 3]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : -'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('woni : '));
  });

  test('기능 테스트 - 경계값 테스트 (랜덤값 9)', async () => {
    // given
    const inputs = ['pobi', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([9]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : -'));
  });

  test('기능 테스트 - 경계값 테스트 (랜덤값 0)', async () => {
    // given
    const inputs = ['pobi', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([0]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : '));
  });

  test('기능 테스트 - 한글 이름 허용', async () => {
    // given
    const inputs = ['포비,우니', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 3]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('포비 : -'));
  });

  test('기능 테스트 - 숫자로만 된 이름 허용', async () => {
    // given
    const inputs = ['12345,67890', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 4]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자'));
  });

  test('기능 테스트 - 자동차 이름이 정확히 5자 (허용)', async () => {
    // given
    const inputs = ['pobi1,woni1', '1'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([4, 4]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자'));
  });

  test('기능 테스트 - 매우 많은 자동차', async () => {
    // given
    const inputs = ['a,b,c,d,e,f,g,h,i,j', '1'];
    const randoms = Array(10).fill(4);
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms(randoms);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자'));
  });

  test('예외 테스트 - 글자수 검사', async () => {
    // given
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 한글,숫자,영어 제외하고 들어갈 경우', async () => {
    // given
    const inputs = ['pobi,java!'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 빈칸일 경우', async () => {
    // given
    const inputs = [''];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 입력 형식이 맞지 않는 경우', async () => {
    // given
    const inputs = ['./,asd'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 음수를 받을 경우', async () => {
    // given
    const inputs = ['pobi,woni', '=1'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 숫자로 0을 받을 경우', async () => {
    // given
    const inputs = ['pobi,woni', '0'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 쉼표만 입력', async () => {
    // given
    const inputs = [',,,'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 빈 이름이 포함된 경우', async () => {
    // given
    const inputs = ['pobi,,woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 시도 횟수가 숫자가 아닌 경우', async () => {
    // given
    const inputs = ['pobi,woni', 'abc'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 시도 횟수가 소수인 경우', async () => {
    // given
    const inputs = ['pobi,woni', '1.5'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 중복된 자동차 이름', async () => {
    // given
    const inputs = ['pobi,pobi'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 이름 앞뒤 공백 포함', async () => {
    // given
    const inputs = [' pobi , woni '];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 이름 중간에 공백 포함', async () => {
    // given
    const inputs = ['po bi,woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 시도 횟수 앞뒤 공백 포함', async () => {
    // given
    const inputs = ['pobi,woni', ' 5 '];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 연속된 쉼표', async () => {
    // given
    const inputs = ['pobi,,,,woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 시작과 끝에 쉼표', async () => {
    // given
    const inputs = [',pobi,woni,'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  // test('예외 테스트 - 매우 큰 숫자 입력', async () => {
  //   // given
  //   const inputs = ['pobi,woni', '999999999999999'];
  //   mockQuestions(inputs);

  //   // when
  //   const app = new App();

  //   // then
  //   await expect(app.run()).rejects.toThrow('[ERROR]');
  // });

  test('예외 테스트 - 16진수 입력', async () => {
    // given
    const inputs = ['pobi,woni', '0x10'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 지수 표기법 입력', async () => {
    // given
    const inputs = ['pobi,woni', '1e5'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 숫자와 문자 혼합', async () => {
    // given
    const inputs = ['pobi,woni', '5abc'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 이모지 포함', async () => {
    // given
    const inputs = ['pobi,🚗'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 탭 문자 포함', async () => {
    // given
    const inputs = ['pobi\twoni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 개행 문자 포함', async () => {
    // given
    const inputs = ['pobi\nwoni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 세미콜론 구분자 사용', async () => {
    // given
    const inputs = ['pobi;woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 소수점이 여러 개', async () => {
    // given
    const inputs = ['pobi,woni', '1.2.3'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 앞에 플러스 기호', async () => {
    // given
    const inputs = ['pobi,woni', '+5'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 괄호 포함', async () => {
    // given
    const inputs = ['(pobi),woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 대괄호 포함', async () => {
    // given
    const inputs = ['[pobi],woni'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - null 입력', async () => {
    // given
    const inputs = [null];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - undefined 입력', async () => {
    // given
    const inputs = [undefined];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
