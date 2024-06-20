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

// FUN 計算 object 長度
function objlength (obj){
    let olen = Object.keys(obj).length
    return olen
}

// FUN 將分類加入畫面
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


// FUN 判斷資料是否有特殊詞 / 資料長度 
printclass()
var data = JSON.parse(fs.readFileSync("proj.json").toString())
if ( typeof data[objlength(data) - 1] === "string") {
    addclick(data[objlength(data) - 1])
}else if ( objlength(data) === 0){
    ipcRenderer.send("ipc-msg", "There are no items in the class")
}else {
    addclick(data[0]["name"])
}

// > 設定每個分類的 css 反應 並增加 function
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

// FUN 將項目加入畫面
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

// ? 如何顯示項目詳細資料
// ? [ 規格 ] [ 成本 ] [ 報價 ]  { 備註 } [ 供應商 ]

// FUN 當點擊時執行 { 如果畫面中有資料 刪除並重新渲染 }
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



// > 當 [ add new class ] 被點擊時執行 並向主進程呼叫視窗
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

// > 當 [ add new item ] 被點擊時執行 並向主進程呼叫視窗
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

// > 當 [ add new child class ] 被點擊時執行 並向主進程呼叫視窗
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

// > 當 [ delete class ] 被點擊時執行 並向主進程呼叫視窗
const declabtn = document.getElementById("decla")
declabtn.addEventListener("mouseover", () => {
    declabtn.classList.add("addclass_mouseover")
})
declabtn.addEventListener("mouseout", () => {
    declabtn.classList.remove("addclass_mouseover")
})
declabtn.addEventListener("click", () => {
    ipcRenderer.send("declabtn click")
})

// > 當 [ delete item ] 被點擊時執行 並向主進程呼叫視窗
const deitmbtn = document.getElementById("deitm")
deitmbtn.addEventListener("mouseover", () => {
    deitmbtn.classList.add("addclass_mouseover")
})
deitmbtn.addEventListener("mouseout", () => {
    deitmbtn.classList.remove("addclass_mouseover")
})

// do 刪除項目功能
// deitmbtn.addEventListener("click", () => {
//     ipcRenderer.send("deitmbtn click")
// })

// > 當 [ delete child class ] 被點擊時執行 並向主進程呼叫視窗
const deCCWbtn = document.getElementById("deCCW")
deCCWbtn.addEventListener("mouseover", () => {
    deCCWbtn.classList.add("addclass_mouseover")
})
deCCWbtn.addEventListener("mouseout", () => {
    deCCWbtn.classList.remove("addclass_mouseover")
})

// do 刪除子分類功能
// deCCWbtn.addEventListener("click", () => {
//     ipcRenderer.send("deCCWbtn click")
// })

// ? 新增子分類項目功能
// ? 刪除子分類項目功能