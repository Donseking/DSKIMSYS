const { ipcRenderer } = require("electron")
var fs = require("fs")

const Data = repro("proj.json")
const profile = "proj.json"
var Mark = Data[len(Data) - 1]
var warnstr = ""
var main = document.getElementById("main")

// FUN 讀取資料
function repro(file){
    var data = JSON.parse(fs.readFileSync(file).toString())
    return data
}

// FUN 警告視窗
function warnning(str){
    fs.writeFileSync("warnwin/warntext.json", JSON.stringify([str]), (err) =>{
        if (err){
            console.log(err)
        }
    })
    send("warn")
}

// FUN 寫入資料
function wripro(file, data){
    fs.writeFileSync(file, JSON.stringify(data), (err) =>{
        if (err){
            console.log(err)
        }
    })
}

// FUN array 長度
function len(arr){
    return arr.length
}

// FUN 讀取所有分類名稱
function allclassname(data){
    var result = []
    if ( typeof Mark == "string" ){
        for ( var i = 0; i < len(data) - 1; i ++ ){
            result.push(data[i]["name"])
        }
    }else {
        for ( var i = 0; i < len(data); i ++ ){
            result.push(data[i]["name"])
        }
    }
    return result
}

// FUN 將項目渲染入畫面
function renderitem(pro){
    main.innerHTML = ''
    for (var i = 0; i < len(pro); i ++ ){
        if ( pro[i]["type"] == "child class item" ){
            var ccdiv = document.createElement("div")
            ccdiv.id = ccdiv
            ccdiv.classList.add("ccdiv")
            ccdiv.innerHTML = " [ C ] " + pro[i]["name"]
            main.appendChild("ccdiv")
        }else if ( pro[i]["type"] == "class item" ){
            var ccdiv = document.createElement("div")
            ccdiv.id = ccdiv
            ccdiv.classList.add("ccdiv")
            ccdiv.innerHTML = pro[i]["name"]
            main.appendChild("ccdiv")
        }
    }
}

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("deitm close")
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
})