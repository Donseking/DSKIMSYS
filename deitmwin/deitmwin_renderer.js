const { ipcRenderer } = require("electron")
var fs = require("fs")

const Data = repro("proj.json")
const profile = "proj.json"
var Mark = repro("./deitmwin/data.json")[0]
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

// FUN 將分類渲染入畫面
function renderclass(cla){
    for ( var i = 0; i < len(cla); i ++ ){
        var div = document.createElement("div")
        div.id = "classes"
        div.classList.add("cladiv")
        div.innerHTML = cla[i]
        main.appendChild(div)
    }
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

if ( len(repro("./deitmwin/data.json")) == 0 ){
    renderclass(allclassname(Data))
}else {
    for ( var i = 0; i < len(Data) - 1; i ++ ){
        if ( Mark == Data[i]["name"] ){
            var pro = Data[i]["project"]
            renderitem(pro)
        }
    }
}

const cladiv = document.querySelectorAll(".cladiv")
cladiv.forEach((e) => {
    e.addEventListener("mouseover", () => {
        e.classList.add("cladivNew")
    })
    e.addEventListener("mouseout", () => {
        e.classList.remove("cladivNew")
    })
    e.addEventListener("click", () => {
        var d = repro("./deitmwin/data.json")
        if ( typeof Mark == "string" ){
            d.splice(-1, 1, e.innerHTML)
            wripro(profile, d)
        }else{
            d.push(e.innerHTML)
            wripro(profile, d)
        }
    })
})