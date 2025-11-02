export const StringUtils = {
  Level: {
    toFullName: (level: string) => {
      switch (level) {
        case "M":
        case "LEVEL_M":
          return "Level 0 Trial – Mock Test";
        case "A":
        case "LEVEL_A":
          return "Level 1 Practitioner – Mock Test";
        case "B":
        case "LEVEL_B":
          return "Level 2 Professional – Mock Test";
        case "C":
        case "LEVEL_C":
          return "Level 3 Expert – Mock Test";
        default:
          return "Level 1 Practitioner – Mock Test";
      }
    },
    toShortName: (level: string) => {
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
          return level;
      }
    },
  },
  abbreviate: (text: string, length: number = 100) => {
    if (!text) {
      return "";
    }
    const stripped = text.replace(/(<([^>]+)>)/gi, " ");
    return stripped.length > length ? stripped.substring(0, length - 3) + "..." : stripped;
  },
};
