import { TIMEOUT_SEC } from './config';
import { state } from './model';
import { DISPLAY_LINES } from './config';

const timeout = function (s: number): Promise<Error> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getJSON = async function (URL: string) {
  try {
    const response: Response | Error = await Promise.race([
      fetch(URL),
      timeout(TIMEOUT_SEC),
    ]);

    if (response instanceof Error) return;
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `${data.message} (${response.status}) initiated from getJSON function`
      );

    return data;
  } catch (error) {
    throw error;
  }
};

const calcRange = function (page: number, lines: number) {
  return {
    start: page * lines,
    end: (page + 1) * lines - 1,
  };
};

const calcMaxPage = () =>
  Math.trunc(state.search.results.length / DISPLAY_LINES);

export { getJSON, calcRange, calcMaxPage };
