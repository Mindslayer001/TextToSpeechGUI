import { TextField, Checkbox } from '@mui/material';
import { MDBInputGroup } from 'mdb-react-ui-kit';

export default function ChangedFileName({ allowFileName, setAllowFileName, setFileName}) {
    return (
        <>
            <MDBInputGroup>
                {
                    allowFileName ?
                        <TextField label="File name" onChange={(e) => setFileName(e.target.value)}
                            sx={{ width: '100%', mt: 1 }}
                        /> :
                        <TextField label="File name" disabled
                            sx={{ width: '100%', mt: 1 }}
                        />
                }
                <Checkbox checked={allowFileName} onChange={(e) => setAllowFileName(e.target.checked)}
                    sx={{ 
                        color: "black",
                        '&.Mui-checked': {
                            color: "black",
                        },
                        mt: 1,
                        ":hover": {
                            backgroundColor: "#00121212",
                            borderRadius: "5px",
                        }
                    }}
                />
            </MDBInputGroup>
        </>
    )
}
