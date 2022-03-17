let languages = {
  Arabic: "ar",
  Chinese: "zh",
  English: "en",
  French: "fr",
  German: "de",
  Hindi: "hi",
  Indonesian: "id",
  Irish: "ga",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Polish: "pl",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Turkish: "tr",
  Vietnamese: "vi"
}

let languageCodes = {
  ar: "Arabic",
  zh: "Chinese",
  en: "English",
  fr: "French",
  de: "German",
  hi: "Hindi",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  pl: "Polish",
  pt: "Portuguese",
  ru: "Russian",
  es: "Spanish",
  tr: "Turkish",
  vi: "Vietnamese"
}

function setLocalStorage() {
  for (let key in languageCodes) {
    let item = localStorage.getItem(key);
    if (Math.floor(item) > 40) {
      localStorage.removeItem(key);
      item = null;
    }
    if (!item) localStorage.setItem(key, 1);
  }
}

setLocalStorage();

function resetLocalStorage() {
  for (let key in languageCodes) {
    localStorage.setItem(key, 1);
  }
}

let languageHash = {
  "fr": {
    "I": "je",
    "the": "le",
    "a": "un/une",
    "of": "de",
    "to": "à",
    "in": "dans",
    "for": "pour",
    "do": "faire",
    "on": "sur",
    "as": "comme",
    "by": "pour",
    "will": "vais",
    "just": "juste"
  },
  "es": {
    "I": "yo",
    "the": "el",
    "do": "hacer",
    "a": "un/una",
    "on": "en",
    "me": "mi",
    "no": "no"
  },
  "pt": {
    "do": "fazer",
    "this": "isto",
    "they": "eles/elas"
  },
  "it": {
    "you": "tu",
    "a": "un/uno/una",
    "in": "in",
    "do": "fare"
  },
  "hi": {
    "the": "यह"
  }
}