const { ipcRenderer } = require("electron")
var fs = require("fs")


// FUN 讀取資料
function repro(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    return data
}

// FUN 寫入資料
function wripro(data, file){
    fs.writeFileSync(file, JSON.stringify(data), (err) =>{
        if (err){
            console.log(err)
        }
    })
}

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("conwin close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

// do 確定按鈕

// do 取消按鈕