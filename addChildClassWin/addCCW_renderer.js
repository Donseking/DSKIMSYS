const { ipcRenderer } = require("electron")
var fs = require("fs")

var data = JSON.parse(fs.readFileSync("proj.json").toString())

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("adCCW close")
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

const enbtn = document.getElementById("enter")
enbtn.addEventListener("mouseover", () => {
    enbtn.classList.add("enter_new")
})
enbtn.addEventListener("mouseout", () => {
    enbtn.classList.remove("enter_new")
})
enbtn.addEventListener("click", () => {
    getCCname()
})

// FUN 獲取子分類名稱 並顯示在主頁面
function getCCname(){
    var warnstr = ""
    var ccname = document.getElementById("name").value
    if ( ccname.length === 0 ){
        warnstr = "Please enter the child class name"
        fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) =>{
            if (err){
                console.log(err)
            }
        })
        ipcRenderer.send("warn")
    }else {
        if ( data.length === 0){
            warnstr = "No classification has been created yet"
            fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) =>{
                if (err){
                    console.log(err)
                }
            })
            ipcRenderer.send("warn")
            ipcRenderer.send("adCCW close")
        }else {
            var mark = data[data.length - 1]
            for ( var i = 0; i < data.length - 1 ; i ++){
                if ( mark === data[i]["name"]){
                    if ( data[i]["project"].length === 0 ){
                        data[i]["project"].push({
                            "name" : ccname,
                            "project" : [],
                            "type" : "child class item"
                        })
                        fs.writeFileSync("proj.json", JSON.stringify(data), (err) =>{
                            if (err){
                                console.log(err)
                            }
                        })
                        break
                    }else{
                        for ( var j = 0; j < data[i]["project"].length ; j ++ ){
                            if ( data[i]["project"][j]["name"] === ccname ){
                                warnstr = "This class name has been created"
                                warn
                                ipcRenderer.send("warn")
                            }else {
                                data[i]["project"].push({
                                    "name" : ccname,
                                    "project" : [],
                                    "type" : "child class item"
                                })
                                fs.writeFileSync("proj.json", JSON.stringify(data), (err) =>{
                                    if (err){
                                        console.log(err)
                                    }
                                })
                            }
                        }
                        break
                    }
                }
            }
            ipcRenderer.send("adCCW close")
        }
    }
}