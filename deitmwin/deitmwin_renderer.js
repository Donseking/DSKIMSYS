const { ipcRenderer } = require("electron")
var fs = require("fs")

const Data = repro("proj.json")
const profile = "proj.json"
var Mark = Data[len(Data) - 1]
var warnstr = ""
var maindiv = document.getElementById("main")

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

// FUN 判斷資料最後是否有特定詞
function if_string(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    if (typeof Data[len(Data) - 1] === "string"){
        return 1
    }else{
        return 0
    }
}


// FUN 將項目渲染入畫面
function renderitem(pro){
    maindiv.innerHTML = ""
    for ( var i = 0; i < len(pro); i ++ ){
        if ( pro[i]["type"] == "child class item" ){
            var ccdiv = document.createElement("div")
            ccdiv.id = 'ccdiv'
            ccdiv.classList.add('ccdiv')
            ccdiv.innerHTML = pro[i]["name"]
            main.appendChild(ccdiv)
        }else if ( pro[i]["type"] == "class item" ){
            var qua = document.createElement("div")
            qua.id = 'qua'
            qua.classList.add("qua")
            qua.innerHTML = pro[i]["num"] + "  " + pro[i]["unit"]
            var ccdiv = document.createElement("div")
            ccdiv.id = 'ccdiv'
            ccdiv.classList.add('ccdiv')
            ccdiv.innerHTML = pro[i]["name"]
            ccdiv.append(qua)
            maindiv.appendChild(ccdiv)
        }
    }

    var div = document.querySelectorAll("#ccdiv")
    div.forEach((e) => {
        e.addEventListener("mouseover", () => {
            e.classList.add("ccdivNew")
        })
        e.addEventListener("mouseout", () => {
            e.classList.remove("ccdivNew")
        })
        e.addEventListener("click", () => {
            if ( if_string() === 0){
                if ( e.hasChildNodes() ){
                    Data.push(e.innerText)
                    fs.writeFileSync("proj.json", JSON.stringify(Data), (err) =>{
                        if (err){
                            console.log(err)
                        }
                    })
                }else {
                    Data.push(e.innerText)
                    fs.writeFileSync("proj.json", JSON.stringify(Data), (err) =>{
                        if (err){
                            console.log(err)
                        }
                    })
                }
            }else{
                Data.splice(-1, 1, e.innerText)
                fs.writeFileSync("proj.json", JSON.stringify(Data), (err) =>{
                    if (err){
                        console.log(err)
                    }
                })
            }
        })
    })
}

// FUN 渲染分類
function renderclass(){
    for ( var i = 0; i < len(Data) - 1; i ++ ){
        var cladiv = document.createElement("div")
        cladiv.id = "cladiv"
        cladiv.classList.add("cladiv")
        cladiv.innerHTML = Data[i]["name"]
        maindiv.appendChild(cladiv)
    }
}

// FUN 讀取項目
function renditem(m){
    for ( var i = 0; i < len( Data ); i ++ ){
        if ( m == Data[i]["name"] ){
            return Data[i]["project"]
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

renderclass()

const cladiv = document.querySelectorAll("#cladiv")
cladiv.forEach((e) => {
    e.addEventListener("mouseover", () => {
        e.classList.add("cladivNew")
    })
    e.addEventListener("mouseout", () => {
        e.classList.remove("cladivNew")
    })
    e.addEventListener("click", () => {
        var mark = e.innerHTML
        renderitem(renditem(mark))
    })
})