import React, { useState } from 'react';
import { MDBInputGroup, MDBBtn } from 'mdb-react-ui-kit';
import { TextField, Select, MenuItem } from '@mui/material';
import { TextToSpeech } from "../../../wailsjs/go/main/App"

const languages = ["af", "ar", "bg", "bn", "bs", "ca", "cs", "cy", "da", "de", "el", "en", "en-AU",
    "en-UK", "eo", "es", "et", "fi", "fr", "gu", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "jv",
    "km", "kn", "ko", "la", "lv", "mk", "ml", "mr", "ms", "my", "ne", "nl", "no", "pl", "pt", "ro", "ru",
    "si", "sk", "sq", "sr", "su", "sv", "sw", "ta", "te", "th", "tl", "tr", "uk", "ur", "vi", "zh"
];

export default function UserPromptCoverter({ allowFileName = false, fileName = "", setShowAlert }) {
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("en");

    function textToSpeech() {
        if (allowFileName && (fileName === "")) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return;
        }

        TextToSpeech(input, language, fileName);
        setInput("");
    }

    return (
        <>
            <MDBInputGroup>
                <TextField value={input} label="Enter your text" onChange={(e) => setInput(e.target.value)}
                    sx={{ width: "100%" }}
                />
                <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    options={languages}
                    autoWidth
                >
                    {
                        languages.map((language, index) => (
                            <MenuItem key={index} value={language}>{language}</MenuItem>
                        ))
                    }
                </Select>

                {
                    input !== "" ?
                        <MDBBtn color="dark" onClick={textToSpeech}>Convert to Speech</MDBBtn>
                        :
                        <MDBBtn color="dark" disabled>Convert to Speech</MDBBtn>
                }
            </MDBInputGroup>
        </>
    )
}
