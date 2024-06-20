const { ipcRenderer } = require("electron")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("adit close")
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
    getdata()
})

// fix 無法輸入第三個項目
// FUN [ 新增項目 ] 主要進入點
function getdata(){
    var name = document.getElementById("name").value
    var num = document.getElementById("num").value
    var unit = document.getElementById("unit").value

    if (name === "" || num === "" || unit === ""){
        var warnstr = "Please enter the items"
        fs.writeFileSync("warnwin/warntext.json", JSON.stringify([warnstr]), (err) =>{
            if (err){
                console.log(err)
            }
        })
        ipcRenderer.send("warn")
    }else {
        adit(name, num, unit)
    }
}

// FUN 輸入的資料判斷
function adit(itname, itnum, itunit){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var mark = data[data.length - 1]
    for ( var i = 0 ; i < data.length - 1 ; i ++){
        if ( data[i]["name"] === mark ){
            var pro = data[i]["project"]
            var namelist = getclassname(pro)
            if ( namelist.length === 0) {
                pro.push(
                    {
                        "name" : itname,
                        "num" : parseInt(itnum),
                        "unit" : itunit,
                        "type" : "class item"
                    }
                )
                fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                    if ( err ) {
                        console.log(err)
                    }
                })
            }else if ( namelist.length > 1 ) {
                for (var j = 0 ; j < namelist.length ; j ++ ) {
                    if ( itname === namelist[j] ){
                        pro[j]["num"] = parseInt(pro[j]["num"]) + parseInt(itnum)
                        data[i]["project"] = pro
                        fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                            if ( err ) {
                                console.log(err)
                            }
                        })
                        break
                    }
                }
                if ( j === namelist.length - 1 ){
                    var newdata = {
                        "name" : itname,
                        "num" : itnum,
                        "unit" : itunit,
                        "type" : "class item"
                    }
                    data[i]['project'].push(newdata)
                    fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                        console.log(err)
                    })
                }
            }else {
                if ( itname != namelist[0] ){
                    var newdata = {
                        "name" : itname,
                        "num" : itnum,
                        "unit" : itunit,
                        "type" : "class item"
                    }
                    data[i]['project'].push(newdata)
                    fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                        console.log(err)
                    })
                }else {
                    pro[0]["num"] = parseInt(pro[0]["num"]) + parseInt(itnum)
                    fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                        if ( err ) {
                            console.log(err)
                        }
                    })
                }
            }
        }
    }
}

// FUN 獲得 json 資料
function getclassname(claname){
    var namelist = []
    for (var i = 0; i < claname.length; i ++){
        namelist.push(claname[i]["name"])
    }
    return namelist
}