const { ipcRenderer } = require("electron")
const fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("warn close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const warn = document.getElementById("warn_string")
var warnstring = JSON.parse(fs.readFileSync("warnwin/warntext.json").toString())
warn.innerHTML = warnstring[0]