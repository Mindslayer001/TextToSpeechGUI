import { Alert } from '@mui/material';

export default function FileConvertedAlert({ showAlert, fileName }) {
    return (
        <>
            {
                showAlert && (fileName === "") ?
                    <Alert severity="success" sx={{ mt: 1, width: "100%" }}>
                        File has been converted into speech successfully!
                    </Alert> :
                    null
            }
        </>
    )
}
