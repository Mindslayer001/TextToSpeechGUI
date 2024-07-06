import { useEffect, useState } from 'react';
import { MDBBtn, MDBInputGroup } from 'mdb-react-ui-kit';
import { TextToSpeech } from '../../../wailsjs/go/main/App';
import { MenuItem, Select, TextField } from '@mui/material';

const languages = ["af", "ar", "bg", "bn", "bs", "ca", "cs", "cy", "da", "de", "el", "en", "en-AU",
    "en-UK", "eo", "es", "et", "fi", "fr", "gu", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "jv",
    "km", "kn", "ko", "la", "lv", "mk", "ml", "mr", "ms", "my", "ne", "nl", "no", "pl", "pt", "ro", "ru",
    "si", "sk", "sq", "sr", "su", "sv", "sw", "ta", "te", "th", "tl", "tr", "uk", "ur", "vi", "zh"
];

export default function FileUploadConverter({ fileName = "", allowFileName = false, setShowErrorAlert = false, setShowDoneAlert }) {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en");

    function fileToText() {
        if (allowFileName && (fileName === "")) {
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 5000);
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setText(fileContent);
            }
            reader.readAsText(file);
        }
    }

    function fileToSpeech() {
        if (allowFileName && (fileName === "")) {
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 5000);
            return;
        }
        fileToText();
        if (text) {
            TextToSpeech(text, language, fileName);
            setShowDoneAlert(true);
            setTimeout(() => {
                setShowDoneAlert(false);
            }, 5000);
        }
    }

    useEffect(() => {
        if (file) {
            fileToText();
        }
    }, [file]);

    return (
        <MDBInputGroup>
            <TextField
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                fullWidth
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
                file !== null ?
                    <MDBBtn color="dark" onClick={fileToSpeech}>Convert to Speech</MDBBtn>
                    :
                    <MDBBtn disabled color="dark">Convert to Speech</MDBBtn>
            }
        </MDBInputGroup>
    )
}
