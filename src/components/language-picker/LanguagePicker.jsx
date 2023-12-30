import React from "react";
import {useTranslation} from "react-i18next";
import {Select, MenuItem, Box} from "@material-ui/core";
import './languagePicker.css';

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
        name: 'French'
    },
    {
        key: 'it-IT',
        name: 'Italian'
    }
]
export const LanguageSelector = () => {
    const {i18n} = useTranslation();
    const selectedLanguage = LANGUAGE.find(language => language.key === i18n.language);
    return (
        <Select
            sx={{ width: 130 }}
            defaultValue={selectedLanguage.key}
            onChange={(value) => i18n.changeLanguage(value)}
            renderValue={(value) => {
                console.log(value);
                return (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <FlagIcon countryCode={selectedLanguage.key.split('-')[0]}/>
                    {selectedLanguage.name}
                </Box>
                );
            }}
        >
        {LANGUAGE.map((option) => (
            <MenuItem key={option.key} value={option.key} name={option.name}>
            <   FlagIcon countryCode={option.key.split('-')[0]}/>
                {option.name}
            </MenuItem>
        ))}
        </Select>
    );
};