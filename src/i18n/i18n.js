import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ae from "./locales/ar-arabic.json";
import el from "./locales/el-greek.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import id from "./locales/id-indonesian.json";
import ja from "./locales/ja-japanese.json";
import ko from "./locales/ko-korean.json";
import pt from "./locales/pt-portuguese.json";
import ru from "./locales/ru-russian.json";
import th from "./locales/th-thai.json";
import tr from "./locales/tr-turkish.json";
import vi from "./locales/vi-vietnamese.json";
import zh_cn from "./locales/zh_cn.json";
import zh_tw from "./locales/zh_tw.json";

const resources = {
  "en-GB": {
    translation: en,
  },
  "fr-FR": {
    translation: fr,
  },
  ae: {
    translation: ae,
  },
  "zh-HK": {
    translation: zh_tw,
  },
  "zh-TW": {
    translation: zh_tw,
  },
  "zh-SC": {
    translation: zh_cn,
  },
  es: {
    translation: es,
  },
  "el-EL": {
    translation: el,
  },
  "id-ID": {
    translation: id,
  },
  "ja-JA": {
    translation: ja,
  },
  "kr-KR": {
    translation: ko,
  },
  "pt-PT": {
    translation: pt,
  },
  "ru-RU": {
    translation: ru,
  },
  "th-TH": {
    translation: th,
  },
  "tr-TR": {
    translation: tr,
  },
  "vi-VI": {
    translation: vi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en-gb", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
