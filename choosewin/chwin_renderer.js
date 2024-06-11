const { ipcRenderer } = require("electron")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("chwin close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

function getclassname(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var name_array = []
    for( var i = 0; i < data.length; i ++ ){
        if ( typeof data[i] === "object"){
            name_array.push(data[i]["name"])
        }
    }
    return name_array
}

function classlsit(){
    var classnamelist = getclassname()
    var main = document.getElementById("main")
    for ( var i = 0; i < classnamelist.length; i ++ ){
        var cladiv = document.createElement("div")
        cladiv.className = "cladiv"
        cladiv.innerHTML = classnamelist[i]
        main.appendChild(cladiv)
    }
}

function if_string(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var result = Object.keys(data).map((key) => [key, data[key]]);
    if (typeof result[result.length - 1][1] === "string"){
        return 1
    }else{
        return 0
    }
}

classlsit()

var mark = document.querySelectorAll(".cladiv")
mark.forEach( (e) => {
    e.addEventListener("click", () => {
        var data = JSON.parse(fs.readFileSync("proj.json").toString())
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
        ipcRenderer.send("chwin close")
    })
})