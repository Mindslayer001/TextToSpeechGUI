import { useEffect, useState } from "react";
import FileUploadConverter from "./FileUpload/FileUploadConverter"
import ChangedFileName from "./ChangeFileName/ChangedFileName";
import NoFileNameAttachedAlert from "./Alerts/NoFileNameAttached";
import FileConvertedAlert from "./Alerts/FileConvertedAlert"

export default function FileToTextConverter() {
    const [fileName, setFileName] = useState('');
    const [allowFileName, setAllowFileName] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showDoneAlert, setShowDoneAlert] = useState(false);

    useEffect(() => {
        if (showErrorAlert && (fileName !== '')) {
            setShowErrorAlert(false);
        }
    }, [fileName, showErrorAlert]);

    return (
        <>
            <FileUploadConverter fileName={fileName} allowFileName={allowFileName} setShowErrorAlert={setShowErrorAlert} setShowDoneAlert={setShowDoneAlert} />
            <ChangedFileName allowFileName={allowFileName} setAllowFileName={setAllowFileName} setFileName={setFileName} />
            <NoFileNameAttachedAlert showAlert={showErrorAlert} fileName={fileName} />
            <FileConvertedAlert showAlert={showDoneAlert} fileName={fileName} />
        </>
    )
}
