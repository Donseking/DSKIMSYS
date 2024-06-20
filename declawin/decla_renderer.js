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
    ipcRenderer.send("decla close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

var maindiv = document.getElementById("main")
addchild(getclassname())

var cla = document.querySelectorAll(".cladiv")
cla.forEach((e) => {
    e.addEventListener("mouseover", () => {
        e.classList.add("cladivNew")
    })
    e.addEventListener("mouseout", () => {
        e.classList.remove("cladivNew")
    })
    e.addEventListener("click", () => {
        ipcRenderer.send("decla click")

        // do 將選擇的分類刪除的功能
    })
})

// FUN 將分類加入畫面
function addchild(li){
    if ( li.length != 0 ){
        for ( var i = 0; i < li.length; i ++ ){
            var div = document.createElement("div")
            div.className = "cladiv"
            div.innerHTML = li[i]
            maindiv.appendChild(div)
        }
    }
}

// FUN 獲取分類名稱
function getclassname(){
    var data = repro()
    var re = []
    for (var i = 0; i < data.length; i ++){
        if ( typeof data[i] != "string" ){
            re.push(data[i]["name"])
        }
    }
    return re
}