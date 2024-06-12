const { ipcRenderer } = require("electron")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("adit close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const chbtn = document.getElementById("choose")
chbtn.addEventListener("mouseover", () => {
    chbtn.classList.add("choose_new")
})
chbtn.addEventListener("mouseout", () => {
    chbtn.classList.remove("choose_new")
})
chbtn.addEventListener("click", () => {
    ipcRenderer.send("choose click")
    console.log(getallclass())
})

const enbtn = document.getElementById("enter")
enbtn.addEventListener("mouseover", () => {
    enbtn.classList.add("enter_new")
})
enbtn.addEventListener("mouseout", () => {
    enbtn.classList.remove("enter_new")
})
enbtn.addEventListener("click", () => {
    getdata()
})

function getdata(){
    var name = document.getElementById("name").value
    var num = document.getElementById("num").value
    var unit = document.getElementById("unit").value
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var mark = data[data.length - 1]
    var newdata = {
        "name" : name,
        "num" : num,
        "unit" : unit,
    }
    for ( var i = 0; i < data.length; i ++ ){
        if ( mark === data[i]["name"] ){
            data[i]["project"].push(newdata)
        }
        fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
            console.log(err)
        })
    }
}

function getallclass(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var name_array = []
    for( var i = 0; i < data.length; i ++ ){
        name_array.push(data[i]["name"])
    }
    return name_array
}