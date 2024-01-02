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
        key: 'sa-ar',
        flag: 'ar',
        name: 'العربية',
    },
    {
        key: 'hk-hk',
        flag: 'hk',
        name: '繁體',
    },
    {
        key: 'cn-cn',
        flag: 'cn',
        name: '简体'
    },
    {
        key: 'es-es',
        flag: 'es',
        name: 'Español'
    },
    {
        key: 'fr-fr',
        flag: 'fr',
        name: 'Français'
    },
    {
        key: 'el-gr',
        flag: 'gr',
        name: 'Ελληνικά'
    },
    {
        key: 'id-id',
        flag: 'id',
        name: 'Bahasa'
    },
    {
        key: 'jp-jp',
        flag: 'jp',
        name: '日本語'
    },
    {
        key: 'kr-kr',
        flag: 'kr',
        name: '한국인'
    },
    {
        key: 'pt-pt',
        flag: 'pt',
        name: 'Português'
    },
    {
        key: 'ru-ru',
        flag: 'ru',
        name: 'Русский'
    },
    {
        key: 'th-th',
        flag: 'th',
        name: 'แบบไทย'
    },
    {
        key: 'tr-tr',
        flag: 'tr',
        name: 'Türkçe'
    },
    {
        key: 'vi-vn',
        flag: 'vn',
        name: 'Tiếng Việt'
    }
]
export const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const classes = useStyle();
    const selectedLanguage = LANGUAGE.find(language => language.key === i18n.language) || {
        key: 'en-gb',
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
                console.log(value);
                return (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <FlagIcon countryCode={selectedLanguage?.flag || 'gb'}/>
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
            <MenuItem key={option.key} value={option.key} name={option.name}>
                <FlagIcon countryCode={option?.flag}/>
                <div className={classes.textBox}>
                    {option.name}
                </div>
            </MenuItem>
        ))}
        </Select>
    );
};