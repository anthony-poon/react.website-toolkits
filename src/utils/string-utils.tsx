const LANG_MAP = {
  ENGLISH: "English",
  ARABIC: "Arabic العربية",
  CANTONESE: "Cantonese 粵語",
  CHINESE_SIMPLIFIED: "Chinese 简体",
  CHINESE_TRADITIONAL_HK: "Chinese 繁體 (港)",
  CHINESE_TRADITIONAL_TW: "Chinese 正體 (台)",
  SPANISH: "Española",
  FRENCH: "Français",
  GREEK: "Greek Ελληνικά",
  INDONESIAN: "Indonesian Bahasa",
  JAPANESE: "Japanese 日本語",
  KOREAN: "Korean 한국인",
  MANDARIN: "Mandarin 國語",
  PORTUGUESE: "Português",
  PUTONGHUA: "Putonghua 普通话",
  RUSSIAN: "Russian Русский",
  THAI: "Thai แบบไทย",
  VIETNAMESE: "Tiếng Việt",
  TURKISH: "Türkçe",
} as const;

const toTitleCase = (input: string) => {
  if (!input) return "";
  return input
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};


export const StringUtils = {
  Level: {
    toFullName: (level: string) => {
      if (!level) return "";
      switch (level) {
        case "M":
        case "LEVEL_M":
          return "Level 0 Trial – Mock Test";
        case "LEVEL_0":
          return "Level 0 Trial";
        case "A":
        case "LEVEL_A":
          return "Level 1 Practitioner – Mock Test";
        case "LEVEL_1":
          return "Level 1 Practitioner";
        case "B":
        case "LEVEL_B":
          return "Level 2 Professional – Mock Test";
        case "LEVEL_2":
          return "Level 2 Professional";
        case "C":
        case "LEVEL_C":
          return "Level 3 Expert – Mock Test";
        case "LEVEL_3":
          return "Level 3 Expert";
        default:
          return level.toUpperCase().replace(/(LEVEL_)?(\w)/, "Level $1");
      }
    },
    toShortName: (level: string) => {
      if (!level) return "";
      switch (level) {
        case "M":
        case "LEVEL_M":
          return "Level 0";
        case "A":
        case "LEVEL_A":
          return "Level 1";
        case "B":
        case "LEVEL_B":
          return "Level 2";
        case "C":
        case "LEVEL_C":
          return "Level 3";
        default:
          return level.toUpperCase().replace(/LEVEL_(\w)/, "Level $1");
      }
    },
  },
  Language: {
    toFullName: (lang: string) => {
      if (!(lang in LANG_MAP)) return toTitleCase(lang);
      return LANG_MAP[lang as keyof typeof LANG_MAP];
    },
    options: () => {
      return Object.entries(LANG_MAP).map(([key, value]) => ({
        display: value,
        value: key,
      }));
    },
    examOptions: () => {
      const order = [
        "ENGLISH", "ARABIC", "CHINESE_SIMPLIFIED", "CHINESE_TRADITIONAL_HK",
        "CHINESE_TRADITIONAL_TW", "SPANISH", "FRENCH", "GREEK", "INDONESIAN",
        "JAPANESE", "KOREAN", "PORTUGUESE", "RUSSIAN", "THAI", "VIETNAMESE", "TURKISH"
      ];
      return order
        .filter(key => key in LANG_MAP)
        .map(key => ({ display: LANG_MAP[key as keyof typeof LANG_MAP], value: key }));
    },
    invigilationOptions: () => {
      const order = [
        "ENGLISH", "ARABIC", "CANTONESE", "MANDARIN", "PUTONGHUA",
        "SPANISH", "FRENCH", "GREEK", "INDONESIAN", "JAPANESE",
        "KOREAN", "PORTUGUESE", "RUSSIAN", "THAI", "VIETNAMESE", "TURKISH"
      ];
      return order
        .filter(key => key in LANG_MAP)
        .map(key => ({ display: LANG_MAP[key as keyof typeof LANG_MAP], value: key }));
    },
  },
  abbreviate: (text: string, length: number = 100) => {
    if (!text) {
      return "";
    }
    const stripped = text.replace(/(<([^>]+)>)/gi, " ");
    return stripped.length > length ? stripped.substring(0, length - 3) + "..." : stripped;
  },
  toTitleCase,
};
