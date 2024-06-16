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
var data = JSON.parse(fs.readFileSync("proj.json").toString())
if ( typeof data[objlength(data) - 1] === "string") {
    addclick(data[objlength(data) - 1])
}else if ( objlength(data) === 0){
    ipcRenderer.send("ipc-msg", "There are no items in the class")
}else {
    addclick(data[0]["name"])
}

const clabtn = document.querySelectorAll(".classes")
clabtn.forEach( (e) => {
    e.addEventListener("mouseover", () => {
        e.classList.add("newclasses")
    })
    e.addEventListener("mouseout", () => {
        e.classList.remove("newclasses")
    })
    e.addEventListener("click", () => {
        addclick(e.innerHTML)
    })
})

function addclick(itname){
    var clicked = if_class_cick(itname)
    var newele = document.getElementById("Main_View")
    var newelediv = document.createElement("div")
    newelediv.id = "itemsdiv"
    newele.appendChild(newelediv)

    if ( objlength(clicked) != 0 ){
        for ( var i = 0; i < clicked.length; i ++ ){
            if ( clicked[i]["type"] === "child class item"){
                var divs = document.createElement("div")
                divs.id = "itemcss"
                divs.innerHTML = clicked[i]["name"]
                newelediv.appendChild(divs)
            }else if ( clicked[i]["type"] === "class item" ){
                var divs = document.createElement("div")
                var quadiv = document.createElement("div")
                divs.id = "itemcss"
                quadiv.id = "qua"
                divs.innerHTML = clicked[i]["name"]
                quadiv.innerHTML = clicked[i]["num"] + "  " + clicked[i]["unit"]
                divs.appendChild(quadiv)
                newelediv.appendChild(divs)
            }
        }
    }
}

function if_class_cick(itemname){
    var un = []
    var maindiv = document.getElementById("Main_View")
    var dd = document.getElementById("itemsdiv")
    if (maindiv.children.length != 0){
        dd.remove()
    }
    var itemdata = JSON.parse(fs.readFileSync("proj.json").toString())
    if (itemdata.length != 0) {
        for (var i = 0; i < itemdata.length; i ++ ){
            if (itemdata[i]["name"] === itemname){
                return itemdata[i]["project"]
            }
        }
    }else {
        return un
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
    ipcRenderer.send("choose click")
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
    ipcRenderer.send("adccw choose click")
})

const declabtn = document.getElementById("decla")
declabtn.addEventListener("mouseover", () => {
    declabtn.classList.add("addclass_mouseover")
})
declabtn.addEventListener("mouseout", () => {
    declabtn.classList.remove("addclass_mouseover")
})
// declabtn.addEventListener("click", () => {
//     ipcRenderer.send("declabtn click")
// })

const deitmbtn = document.getElementById("deitm")
deitmbtn.addEventListener("mouseover", () => {
    deitmbtn.classList.add("addclass_mouseover")
})
deitmbtn.addEventListener("mouseout", () => {
    deitmbtn.classList.remove("addclass_mouseover")
})
// deitmbtn.addEventListener("click", () => {
//     ipcRenderer.send("deitmbtn click")
// })

const deCCWbtn = document.getElementById("deCCW")
deCCWbtn.addEventListener("mouseover", () => {
    deCCWbtn.classList.add("addclass_mouseover")
})
deCCWbtn.addEventListener("mouseout", () => {
    deCCWbtn.classList.remove("addclass_mouseover")
})
// deitmbtn.addEventListener("click", () => {
//     ipcRenderer.send("deCCWbtn click")
// })