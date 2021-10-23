// This Module will contain functions that are resused multiple times in the App
import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Recipe not Found! 😟 --> ${data.message.slice(0, -1)} (${
          response.status
        })`
      );
    }

    return data;
  } catch (error) {
    // handles the error in model.js
    throw error;
  }
};
