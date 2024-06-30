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

// FUN 向主進程傳訊息
function send(str, ar){
    ipcRenderer.send(str, ar)
}

// FUN 判斷資料最後是否有特定詞
function if_string(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var result = Object.keys(data).map((key) => [key, data[key]]);
    if (typeof result[result.length - 1][1] === "string"){
        return 1
    }else{
        return 0
    }
}

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
        var data = repro()
        if ( if_string() === 0){
            data.push(e.innerHTML)
            fs.writeFileSync("proj.json", JSON.stringify(data), (err) =>{
                if (err){
                    console.log(err)
                }
            })
        }else{
            data.splice(-1, 1, e.innerHTML)
            fs.writeFileSync("proj.json", JSON.stringify(data), (err) =>{
                if (err){
                    console.log(err)
                }
            })
        }
        send("decla class click")
    })
})