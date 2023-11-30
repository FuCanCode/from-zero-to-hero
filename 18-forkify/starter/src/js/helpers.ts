import { TIMEOUT_SEC } from './config';
import { state } from './model';
import { DISPLAY_LINES } from './config';
import {
  CustomRecipe,
  RecipeFormatDownload,
  RecipeFormatUpload,
} from './types';

const timeout = function (s: number): Promise<Error> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (
  URL: string,
  recipe: RecipeFormatUpload | undefined = undefined
) {
  try {
    const fetchPro = recipe
      ? fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipe),
        })
      : fetch(URL);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (response instanceof Error) return;
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
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

export { calcRange, calcMaxPage, AJAX };
