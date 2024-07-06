package main

import (
    "context"
    "os"
    "path"
    "runtime"
    "strings"

    htgotts "github.com/hegedustibor/htgo-tts"
    "github.com/google/uuid"
    // voices "github.com/hegedustibor/htgo-tts/voices"
)

// App struct
type App struct {
    ctx context.Context
}

func NewApp() *App {
    return &App{}
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

func (a *App ) TextToSpeech(text, language, fileName string) {
    var userHome string
    if runtime.GOOS == "windows" {
        if fileName == "" {
            fileName = uuid.New().String() + ".mp3"
        } else {
            fileName = generateFileName(fileName) 
        }
        userHome = os.Getenv("USERPROFILE")
    } else {
        if fileName == "" {
            fileName = uuid.New().String() + ".mp3"
        } else {
            fileName = generateFileName(fileName)
        }
        userHome = os.Getenv("HOME")
    }

    folderPath := path.Join(userHome, "Desktop", "TTS")

    speech := htgotts.Speech{Language: language , Folder: folderPath}

    speech.CreateSpeechFile(text, fileName)
}

func generateFileName(text string) string {
    if runtime.GOOS != "windows" {
        if isProperFileNameOnLinuxAndMacOS(text) {
            return strings.ReplaceAll(text, "/", "-")
        }
    }

    if isForbiddenNameWindows(text) {
        return uuid.New().String()
    }

    for {
        isProper, c := isProperFileNameOnWindows(text)
        if isProper {
            switch c {
            case '/':
                text = strings.ReplaceAll(text, "/", "-")
            case '\\':
                text = strings.ReplaceAll(text, "\\", "-")
            case ':':
                text = strings.ReplaceAll(text, ":", "-")
            case '*':
                text = strings.ReplaceAll(text, "*", "-")
            case '?':
                text = strings.ReplaceAll(text, "?", "-")
            case '"':
                text = strings.ReplaceAll(text, "\"", "-")
            case '<':
                text = strings.ReplaceAll(text, "<", "-")
            case '>':
                text = strings.ReplaceAll(text, ">", "-")
            case '|':
                text = strings.ReplaceAll(text, "|", "-")
            }
        } else {
            break
        }
    }

    return text
}

func isProperFileNameOnLinuxAndMacOS(text string) bool {
    if runtime.GOOS != "windows" {
        return strings.Contains(text, "/")
    }

    return false
}

func isForbiddenNameWindows(text string) bool {
    forbiddenNames := []string{"CON", "PRN", "AUX", "CLOCK$", "NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9", "$Mft", "$MftMirr", "$LogFile", "$Volume", "$AttrDef", "$Bitmap", "$Boot", "$BadClus", "$Secure", "$Upcase", "$Extend", "$Quota", "$ObjId", "$Reparse"}

    for _, forbiddenName := range forbiddenNames {
        if text == forbiddenName {
            return true
        }
    }

    return false
}
func isProperFileNameOnWindows(text string) (bool, rune) {

    if runtime.GOOS == "windows" {
        for _, c := range text {
            if c == '/' || c == '\\' || c == ':' || c == '*' || c == '?' || c == '"' || c == '<' || c == '>' || c == '|' {
                return true, c
            }
        }
    }

    return false, 'a'
}
