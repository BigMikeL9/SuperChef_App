// This Module will contain functions that are resused multiple times in the App
export const getJSON = async function (url) {
  try {
    const response = await fetch(url);

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
    console.error(`⛔ ${error} ⛔`);
  }
};
