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
    if ( getvalue() === "ok"){
        ipcRenderer.send("adca close")
    }else {
        ipcRenderer.send("warn")
    }
})

function objlength (obj){
    let olen = Object.keys(obj).length
    return olen
}


function getvalue(){
    var vals = document.getElementById("input_bar")
    var val = vals.value
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var warnstr = ""
    if ( typeof data[objlength(data) - 1] != "string" ){
        if ( val.length != 0 ){
            if (objlength(data) != 0){
                for ( var i = 0; i < data.length ; i ++ ){
                    if ( val === data[i]["name"] ){
                        warnstr = "Please do not repeat class names"
                        fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) => {
                            if (err){
                                console.log(err)
                            }
                        })
                        return "no"
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
                        return "ok"
                    }
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
                return "ok"
            }
        }else{
            vals.style.border = "3px solid #FF5151"
            warnstr = "Please enter the class name"
            fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) =>{
                if (err){
                    console.log(err)
                }
            })
            return "no"
        }
    }else{
        if ( val.length != 0 ){
            if (objlength(data) != 0){
                for ( var i = 0; i < data.length - 1 ; i ++ ){
                    if ( val === data[i]["name"] ){
                        warnstr = "Please do not repeat class names"
                        fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) => {
                            if (err){
                                console.log(err)
                            }
                        })
                        return "no"
                    }else {
                        var newdata = {
                            "name" : val,
                            "project" : []
                        }
                        const result = Object.keys(data).map((key) => data[key]);
                        result.splice(-1, 0, newdata)
                        fs.writeFileSync("proj.json", JSON.stringify(result), (err) =>{
                            if (err){
                                console.log(err)
                            }
                        })
                        return "ok"
                    }
                }
            }else {
                var newdata = {
                    "name" : val,
                    "project" : []
                }
                const result = Object.keys(data).map((key) => data[key]);
                result.splice(-2, 0, newdata)
                fs.writeFileSync("proj.json", JSON.stringify(result), (err) =>{
                    if (err){
                        console.log(err)
                    }
                })
                return "ok"
            }
        }else{
            vals.style.border = "3px solid #FF5151"
            warnstr = "Please enter the class name"
            fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) =>{
                if (err){
                    console.log(err)
                }
            })
            return "no"
        }
    }
    // cmd.runSync("py jshand.py")
}