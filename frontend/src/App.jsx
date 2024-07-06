import { useState } from "react"
import "./App.css"
import { Button, ButtonGroup } from "@mui/material"
import TextToSpeechConverter from "./components/TextToSpeechConverter"
import FileToTextConverter from "./components/FileToTextConverter"

function App() {
    const [page, setPage] = useState(1)

    return (
        <>
            <h1 style={{ userSelect: "none" }}>Convert Text to Speech</h1>
            <br />
            <br />
            <ButtonGroup color="primary" variant="text" disableRipple>
                <Button onClick={() => setPage(1)} sx={{ color: "black", ":hover": { backgroundColor: "#00121212" } }}>Text</Button>
                <Button onClick={() => setPage(2)} sx={{ color: "black", ":hover": { backgroundColor: "#00121212" } }}>File</Button>
            </ButtonGroup>

            <br />
            <br />
            {
                page === 1 ?
                    <TextToSpeechConverter />
                    :
                    <FileToTextConverter />
            }
        </>
    )
}

export default App
