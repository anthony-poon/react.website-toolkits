import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar-arabic.json'
import el from './locales/el-greek.json'
import es from './locales/es.json'
import id from './locales/id-indonesian.json'
import ja from './locales/ja-japanese.json'
import ko from './locales/ko-korean.json'
import pt from './locales/pt-portuguese.json'
import ru from './locales/ru-russian.json'
import th from './locales/th-thai.json'
import tr from './locales/tr-turkish.json'
import vi from './locales/vi-vietnamese.json'
import zh_cn from './locales/zh_cn.json'
import zh_tw from './locales/zh_tw.json'

const resources = {
  'en-GB': {
    translation: en
  },
  'fr-FR':{
    translation: fr
  },
  'sa-ar':{
    translaton: ar
  },
  'hk-hk':{
    translation: zh_tw
  },
  'cn-cn':{
    translaton: zh_cn
  },
  'es-es':{
    translaton: es
  },
  'el-gr':{
    translaton: el
  },
  'id-id':{
    translaton: id
  },
  'ja-jp':{
    translaton: ja
  },
  'kr-kr':{
    translaton: ko
  },
  'pt-pt':{
    translaton: pt
  },
  'ru-ru':{
    translaton: ru
  },
  'th-th':{
    translaton: th
  },
  'tr-tr':{
    translaton: tr
  },
  'vi-vn':{
    translaton: vi
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en-gb', // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
  
  export default i18n;