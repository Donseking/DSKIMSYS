const { ipcRenderer } = require("electron")
var fs = require("fs")
var data = repro()
var mark = data[len(data) - 1]
var profile = "proj.json"

// FUN 讀取資料
function repro(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    return data
}

// FUN array 長度
function len(arr){
    return arr.length
}

// FUN 寫入資料
function wripro(data, file){
    fs.writeFileSync(file, JSON.stringify(data), (err) =>{
        if (err){
            console.log(err)
        }
    })
}

// FUN 刪除指定分類
function delclass(){
    for ( var i = 0; i < len(data) - 1; i ++ ){
        if ( mark == data[i]["name"] ){
            data.splice(i, 1)
            data.splice(len(data) - 1, 1)
            wripro(data, profile)
        }
    }
}

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("conwin close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    console.log("ok")
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const main = document.getElementById("main")
main.innerHTML = " 確定要刪除 " + mark + " 分類嗎 ? "

const sure = document.getElementById("sure")
sure.addEventListener("mouseover", () => {
    sure.classList.add("btnnew")
})
sure.addEventListener("mouseout", () => {
    sure.classList.remove("btnnew")
})
sure.addEventListener("click", () => {
    delclass()
    ipcRenderer.send("conwin close")
})

const cancel = document.getElementById("cancel")
cancel.addEventListener("mouseover", () => {
    cancel.classList.add("btnnew")
})
cancel.addEventListener("mouseout", () => {
    cancel.classList.remove("btnnew")
})
cancel.addEventListener("click", () => {
    ipcRenderer.send("conwin close")
})