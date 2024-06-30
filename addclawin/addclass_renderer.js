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
    getvalue()
})

// FUN 計算 object 長度
function objlength (obj){
    let olen = Object.keys(obj).length
    return olen
}

// FUN array 長度
function len(arr){
    return arr.length
}

// FUN 獲取class name
function allclassname(data, a){
    var dlen = len(data)
    var all = []
    for ( var i = 0; i < dlen - a; i ++ ){
        all.push(data[i]["name"])
    }
    return all
}

// FUN 向主進程傳訊息
function send(str, ar){
    ipcRenderer.send(str, ar)
}

// FUN 錯誤訊息
function warnning(str){
    fs.writeFileSync("warnwin/warntext.json", JSON.stringify([str]), (err) =>{
        if (err){
            console.log(err)
        }
    })
    send("warn")
}

// FUN [ 新增分類 ] 主要 function
function getvalue(){
    console.log("ok")
    var vals = document.getElementById("input_bar")
    var val = vals.value
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var warnstr = ""
    if ( val != " " ){
        if ( typeof data[objlength(data) - 1] != "string" ){
            if ( val.length != 0 ){
                if ( objlength(data) != 0 ){
                    var cla = allclassname(data, 0)
                    for ( var i = 0; i < len(cla); i ++ ){
                        console.log(i, cla[i], val)
                        if ( cla[i] === val ){
                            warnstr = "This class has been created"
                            warnning(warnstr)
                            break
                        }
                    }
                    if ( i == len(cla) && cla[i - 1] != val ){
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
                    }
                }else {
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
                }
            }else{
                vals.style.border = "3px solid #FF5151"
                warnstr = "Please enter the class name"
                warnning(warnstr)
            }
        }else{
            if ( val.length != 0 ){
                if (objlength(data) != 0){
                    var cla = allclassname(data, 1)
                    for ( var i = 0; i < len(cla); i ++ ){
                        if ( cla[i] == val ){
                            warnstr = "Please do not repeat class names"
                            warnning(warnstr)
                            break
                        }
                    }
                    if ( i == len(cla) && cla[i - 1] != val ){
                        var newdata = {
                            "name" : val,
                            "project" : []
                        }
                        var result = Object.keys(data).map((key) => data[key])
                        result.splice(-1, 0, newdata)
                        fs.writeFileSync("proj.json", JSON.stringify(result), (err) =>{
                            if (err){
                                console.log(err)
                            }
                        })
                    }
                }else {
                    var newdata = {
                        "name" : val,
                        "project" : []
                    }
                    var results = Object.keys(data).map((key) => data[key]);
                    results.splice(-2, 0, newdata)
                    fs.writeFileSync("proj.json", JSON.stringify(results), (err) =>{
                        if (err){
                            console.log(err)
                        }
                    })
                }
            }else{
                vals.style.border = "3px solid #FF5151"
                warnstr = "Please enter the class name"
                warnning(warnstr)
            }
        }
    }else {
        warnstr = "Please do not enter ' ' for class name"
        warnning(warnstr)
    }
    // cmd.runSync("py jshand.py")
}