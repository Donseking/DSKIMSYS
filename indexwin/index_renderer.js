const { ipcRenderer } = require("electron")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const minbtn = document.getElementById("Min")
minbtn.addEventListener("click", () => {
    ipcRenderer.send("min")
})

const conbar = document.getElementById("control_itemclass")

function objlength (obj){
    let olen = Object.keys(obj).length
    return olen
}

function printclass(){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    if ( objlength(data) != 0 ){
        if ( typeof data[objlength(data) - 1] != "string" ){
            for ( var i = 0; i < data.length; i ++ ){
                var cladiv = document.createElement("div")
                cladiv.classList.add("classes")
                cladiv.innerHTML = data[i]["name"]
                conbar.appendChild(cladiv)
            }
        }else {
            for ( var i = 0; i < data.length - 1 ; i ++ ){
                var cladiv = document.createElement("div")
                cladiv.classList.add("classes")
                cladiv.innerHTML = data[i]["name"]
                conbar.appendChild(cladiv)
            }
        }
    }
}
printclass()

const clabtn = document.querySelectorAll(".classes")
clabtn.forEach( (e) => {
    e.addEventListener("mouseover", () => {
        e.classList.add("newclasses")
    })
    e.addEventListener("mouseout", () => {
        e.classList.remove("newclasses")
    })
    e.addEventListener("click", () => {
        addclick(e)
    })
})

function addclick(e){
    var clicked = if_class_cick(e.innerHTML)
    var newele = document.getElementById("Main_View")
    var newelediv = document.createElement("div")
    newelediv.id = "itemsdiv"
    newele.appendChild(newelediv)
    for ( var i = 0; i < clicked.length; i ++ ){
        var divs = document.createElement("div")
        var quadiv = document.createElement("div")
        divs.id = "itemcss"
        quadiv.id = "qua"
        divs.innerHTML = clicked[i].name
        quadiv.innerHTML = clicked[i].quantity + "  " + clicked[i].unit
        divs.appendChild(quadiv)
        newelediv.appendChild(divs)
    }
}

function if_class_cick(itemname){
    var maindiv = document.getElementById("Main_View")
    var dd = document.getElementById("itemsdiv")
    if (maindiv.children.length != 0){
        dd.remove()
    }
    var itemdata = JSON.parse(fs.readFileSync("./proj.json").toString())
    for (var i = 0; i < itemdata.length; i ++ ){
        if (itemdata[i].name == itemname){
            return itemdata[i].project
        }
    }
}

const adcabtn = document.getElementById("adcla")
adcabtn.addEventListener("mouseover", () => {
    adcabtn.classList.add("addclass_mouseover")
})
adcabtn.addEventListener("mouseout", () => {
    adcabtn.classList.remove("addclass_mouseover")
})
adcabtn.addEventListener("click", () => {
    ipcRenderer.send("adcabtn click")
})

const aditbtn = document.getElementById("aditm")
aditbtn.addEventListener("mouseover", () => {
    aditbtn.classList.add("addclass_mouseover")
})
aditbtn.addEventListener("mouseout", () => {
    aditbtn.classList.remove("addclass_mouseover")
})
aditbtn.addEventListener("click", () => {
    ipcRenderer.send("aditbtn click")
})

const adCCWbtn = document.getElementById("adCCW")
adCCWbtn.addEventListener("mouseover", () => {
    adCCWbtn.classList.add("addclass_mouseover")
})
adCCWbtn.addEventListener("mouseout", () => {
    adCCWbtn.classList.remove("addclass_mouseover")
})
adCCWbtn.addEventListener("click", () => {
    ipcRenderer.send("adCCWbtn click")
})