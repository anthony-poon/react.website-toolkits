export const convertLevelMABCToNumeric = (level: string): string => {
  switch (level) {
    case "Level M":
      return "Level 0";
    case "Level A":
      return "Level 1";
    case "Level B":
      return "Level 2";
    case "Level C":
      return "Level 3";
    default:
      return level;
  }
};

export const getLevelFullTitleByShortName = (level: string): string => {
  switch (level) {
    case "LEVEL_M":
      return "Level 0 Trial – Mock Test";
    case "LEVEL_A":
      return "Level 1 Practitioner – Mock Test";
    case "LEVEL_B":
      return "Level 2 Professional – Mock Test";
    case "LEVEL_C":
      return "Level 3 Expert – Mock Test";
    default:
      return "Level 1 Practitioner – Mock Test";
  }
};


export const getLevelFullTitleByCode = (level: string): string => {
  switch (level) {
    case "M":
      return "Level 0 Trial – Mock Test";
    case "A":
      return "Level 1 Practitioner – Mock Test";
    case "B":
      return "Level 2 Professional – Mock Test";
    case "C":
      return "Level 3 Expert – Mock Test";
    default:
      return "Level 1 Practitioner – Mock Test";
  }
};
