const { ipcRenderer } = require("electron")
var cmd = require("node-cmd")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("adca close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const enbtn = document.getElementById("enter")
enbtn.addEventListener("mouseover", () => {
    enbtn.classList.add("enter_new")
})
enbtn.addEventListener("mouseout", () => {
    enbtn.classList.remove("enter_new")
})
enbtn.addEventListener("click", () => {
    ipcRenderer.send("enbtn click")
    getvalue()
})

function getvalue(){
    var val = document.getElementById("input_bar").value
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var newdata = {
        "name" : val,
        "project" : []
    }
    data.push(newdata)
    fs.writeFileSync("proj.json", JSON.stringify(data), (err) =>{
        if (err){
            console.log(err)
        }
    })
    cmd.runSync("py jshand.py")
}