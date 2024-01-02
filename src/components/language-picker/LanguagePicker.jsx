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
        key: 'en-GB',
        name: 'English'
    },
    {
        key: 'fr-FR',
        name: 'Français'
    },
    {
        key: 'ar-AR',
        name: 'العربية',
    },
    {
        key: 'hk-HK',
        name: '繁體',
    },
    {
        key: 'cn-CN',
        name: '简体'
    }
]
export const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const classes = useStyle();
    const selectedLanguage = LANGUAGE.find(language => language.key === i18n.language);
    return (
        <Select
            className={classes.select}
            sx={{ width: 130 }}
            defaultValue={'en-GB'}
            disableUnderline
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            renderValue={(value) => {
                console.log(value);
                return (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <FlagIcon countryCode={selectedLanguage.key.split('-')[0]}/>
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
                <FlagIcon countryCode={option.key.split('-')[0]}/>
                <div className={classes.textBox}>
                    {option.name}
                </div>
            </MenuItem>
        ))}
        </Select>
    );
};