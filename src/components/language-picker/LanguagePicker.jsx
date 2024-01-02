import React from "react";
import {useTranslation} from "react-i18next";
import {Select, MenuItem, Box, makeStyles} from "@material-ui/core";
import './languagePicker.css';
const useStyle = makeStyles((theme) => ({
    select:{
        color: '#FFF !important',
    },
    textBox:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        paddingLeft: theme.spacing(1)
    }
  }));
function FlagIcon({countryCode = ""}) {

    if (countryCode === "en") {
        countryCode = "gb-eng";
    }

    return (
        <span
            className={`fi fis fiCircle inline-block mr-2 fi-${countryCode}`}
        />
    );
}
const LANGUAGE = [
    {
        key: 'en-gb',
        flag: 'gb',
        name: 'English'
    },
    {
        key: 'ar',
        flag: 'sa',
        name: 'العربية',
    },
    {
        key: 'zh-HK',
        flag: 'hk',
        name: '繁體',
    },
    {
        key: 'zh-SC',
        flag: 'cn',
        name: '简体'
    },
    {
        key: 'es',
        flag: 'es',
        name: 'Español'
    },
    {
        key: 'fr-FR',
        flag: 'fr',
        name: 'Français'
    },
    {
        key: 'el-EL',
        flag: 'gr',
        name: 'Ελληνικά'
    },
    {
        key: 'id-ID',
        flag: 'id',
        name: 'Bahasa'
    },
    {
        key: 'ja-JA',
        flag: 'jp',
        name: '日本語'
    },
    {
        key: 'kr-KR',
        flag: 'kr',
        name: '한국인'
    },
    {
        key: 'pt-PT',
        flag: 'pt',
        name: 'Português'
    },
    {
        key: 'ru-RU',
        flag: 'ru',
        name: 'Русский'
    },
    {
        key: 'th-TH',
        flag: 'th',
        name: 'แบบไทย'
    },
    {
        key: 'tr-TR',
        flag: 'tr',
        name: 'Türkçe'
    },
    {
        key: 'vi-VI',
        flag: 'vn',
        name: 'Tiếng Việt'
    }
]
export const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const classes = useStyle();
    const selectedLanguage = LANGUAGE.find(language => language.key === i18n.language) || {
        key: 'en-gb',
        name: 'English',
        flag: 'gb',
    };
    return (
        <Select
            className={classes.select}
            sx={{ width: 130 }}
            defaultValue={'en-gb'}
            disableUnderline
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            renderValue={(value) => {
                console.log(selectedLanguage);
                return (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <FlagIcon countryCode={selectedLanguage?.flag}/>
                    <div className={classes.textBox}>
                        {selectedLanguage.name}
                    </div>
                </Box>
                );
            }}
            MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
        >
        {LANGUAGE.map((option) => (
            <MenuItem key={option.key} value={option.key} name={option.name} flag={option.flag}>
                <FlagIcon countryCode={LANGUAGE.find(item => item.key === option.key)?.flag}/>
                <div className={classes.textBox}>
                    {option.name}
                </div>
            </MenuItem>
        ))}
        </Select>
    );
};