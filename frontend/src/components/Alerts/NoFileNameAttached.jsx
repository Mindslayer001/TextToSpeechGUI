import { Alert } from '@mui/material';

export default function NoFileAttachedAlert({ showAlert, fileName }) {
    return (
        <>
            {
                showAlert && (fileName === "") ?
                    <Alert severity='error' sx={{ mt: 1, width: "100%" }}>
                        File name cannot be empty, please enter a valid file name or uncheck the checkbox.
                    </Alert> :
                    null
            }
        </>
    )
}
