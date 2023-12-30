import React, {useEffect, useState} from "react";
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


const LANGUAGE_SELECTOR_ID = 'language-selector';
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


    if (!selectedLanguage) {
        console.log(i18n.language);
        return <>bad</>;
    }

    return (
        <Box>
            <Select
                sx={{ width: 130 }}
                defaultValue={selectedLanguage.key}
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
                <FlagIcon countryCode={option.key.split('-')[0]}/>
                {option.name}
                </MenuItem>
            ))}
            </Select>
      </Box>
    );
};