import { Box, MenuItem, Select, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import "/node_modules/flag-icons/css/flag-icons.min.css";

const FlagIcon = ({ countryCode = "" }) => {
  if (countryCode === "en") {
    countryCode = "gb-eng";
  }

  return (
    <span
      className={`fi fis inline-block mx-13 fi-${countryCode}`}
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        fontSize: "20px",
        borderRadius: "100%",
        border: "none",
        boxShadow: "inset 0 0 0 2px rgba(0, 0, 0, 0.06)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
const LANGUAGE = [
  {
    key: "en-gb",
    flag: "gb",
    name: "English",
  },
  {
    key: "ae",
    flag: "ae",
    name: "العربية",
  },
  {
    key: "zh-SC",
    flag: "cn",
    name: "简体",
  },
  {
    key: "zh-HK",
    flag: "hk",
    name: "繁體 (港)",
  },
  {
    key: "zh-TW",
    flag: "tw",
    name: "正體 (台)",
  },
  {
    key: "es",
    flag: "es",
    name: "Español",
  },
  {
    key: "fr-FR",
    flag: "fr",
    name: "Français",
  },
  {
    key: "el-EL",
    flag: "gr",
    name: "Ελληνικά",
  },
  {
    key: "id-ID",
    flag: "id",
    name: "Bahasa",
  },
  {
    key: "ja-JA",
    flag: "jp",
    name: "日本語",
  },
  {
    key: "kr-KR",
    flag: "kr",
    name: "한국인",
  },
  {
    key: "pt-PT",
    flag: "pt",
    name: "Português",
  },
  {
    key: "ru-RU",
    flag: "ru",
    name: "Русский",
  },
  {
    key: "th-TH",
    flag: "th",
    name: "แบบไทย",
  },
  {
    key: "tr-TR",
    flag: "tr",
    name: "Türkçe",
  },
  {
    key: "vi-VI",
    flag: "vn",
    name: "Tiếng Việt",
  },
];
export const LanguageSelector = ({ textColor = "#222" }) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const selectedLanguage = LANGUAGE.find((language) => language.key === i18n.language) || {
    key: "en-gb",
    name: "English",
    flag: "gb",
  };
  const style = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing(1),
  };
  return (
    <Select
      style={{
        color: textColor,
        background: "transparent",
      }}
      variant={"standard"}
      sx={{
        minWidth: 120,
        borderRadius: 99, 
        px: 0, 
      }}
      value={selectedLanguage.key}
      disableUnderline
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      renderValue={() => (
        <Box sx={{ display: "flex", gap: 3, pr:2 }}>
          <FlagIcon countryCode={selectedLanguage?.flag} />
          <Box style={style}>{selectedLanguage.name}</Box>
        </Box>
      )}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        getContentAnchorEl: null,
      }}>
      {LANGUAGE.map((option) => (
        <MenuItem
          key={option.key}
          value={option.key}
          name={option.name}
          flag={option.flag}
          divider={option.key === "en-gb" && true}>
          <FlagIcon countryCode={LANGUAGE.find((item) => item.key === option.key)?.flag} />
          <Box style={style}>{option.name}</Box>
        </MenuItem>
      ))}
    </Select>
  );
};
