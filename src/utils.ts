const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  key: process.env.API_KEY,
});

export const iterateObj = async (obj: any, targetLang: string) => {
  const keys: string[] = [];
  const strings = [];
  for (var key in obj) {
    keys.push(key);
    const value = obj[key];
    if (typeof value === "object") {
      await iterateObj(value, targetLang);
    } else {
      strings.push(value);
    }
  }

  if (strings.length === 0) return;

  let [translations] = await translate.translate(strings, targetLang);
  translations = Array.isArray(translations) ? translations : [translations];
  translations.forEach((translation: any, i: number) => {
    const key = keys[i];
    obj[key] = translation;
  });
};
